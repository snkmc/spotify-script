//getPlaylistData() : SpotifyのAPIをコールし、プレイリスト内の楽曲情報を入手
function getPlaylistData(plid) {
  var url = "https://api.spotify.com/v1/playlists/" + plid;
  var headers = {
    "Content-Type" : "application/json;",
    'Authorization': 'Bearer ' + getAccessToken(client_id, client_secret),
  };

  var postData = {

  };

  var options = {
    "method" : "get",
    "headers" : headers,
  };

  var data = JSON.parse(UrlFetchApp.fetch(url, options));
  var playlistdata = [];
  
  for(var item in data["tracks"]["items"]) {
    playlistdata[item] = [
      data["name"],//←Spotifyプレイリスト名を抽出
      data["external_urls"]["spotify"],//←SpotifyプレイリストのURLを抽出
      data["tracks"]["items"][item]["track"]["artists"][0]["name"],//プレイリスト内の曲のアーティスト名を抽出
      data["tracks"]["items"][item]["track"]["name"],//プレイリスト内の曲の曲名を抽出
      data["tracks"]["items"][item]["track"]["duration_ms"],//プレイリスト内の曲の長さを抽出
      data["tracks"]["items"][item]["track"]["album"]["name"],//プレイリスト内の曲のアルバム名を抽出
      data["tracks"]["items"][item]["track"]["external_urls"]["spotify"]//プレイリスト内の曲のURLを抽出
    ];
  }

  insertArray(playlistdata);//←Spotifyプレイリストから抽出したデータをGoogle Spreadsheetに書き出し
    
}


//insertArray() : 抽出したプレイリスト内の楽曲情報をGoogle Spreadsheetに入力
function insertArray(insertdata){
  var output_file = SpreadsheetApp.openById(spreadsheetId); //Google Spreadsheetのファイルを開く
  var output_sheet = output_file.getSheetByName("PlaylistData"); //Google Spreadsheetのシートを開く

  var insertdata_lastcolumn = insertdata[1].length; //入力予定配列のカラム数を取得する
  var insertdata_lastrow = insertdata.length;   //入力予定配列の行数を取得する
  
  output_sheet.getRange(output_sheet.getLastRow() + 1,1,insertdata_lastrow,insertdata_lastcolumn).setValues(insertdata);//配列内のプレイリスト楽曲情報をGoogle Spreadsheetに入力
}