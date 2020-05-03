//初期設定
var client_id = '{"Client ID"}'//←Spotify APIのClient ID
var client_secret = '{"Client Secret"}'//←Spotify APIのClient Secret

var playlist_id = '{"Playlist ID"}'//←SpotifyプレイリストのIDを入れる

var spreadsheetId = '{"Google Spreadsheet ID"}'//←スプレッドシートのIDを入れる


//getPlaylistData() : SpotifyのAPIをコールし、プレイリスト内の楽曲情報を入手
function getPlaylistData() {
  var url = "https://api.spotify.com/v1/playlists/" + playlist_id;
  var headers = {
    "Content-Type" : "application/json;",
    'Authorization': 'Bearer ' + getAccessToken(),
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
      data["tracks"]["items"][item]["track"]["artists"][0]["name"],//←プレイリスト内の曲のアーティスト名を抽出
      data["tracks"]["items"][item]["track"]["name"],//←プレイリスト内の曲の曲名を抽出
      data["tracks"]["items"][item]["track"]["duration_ms"],//←プレイリスト内の曲の長さを抽出
      data["tracks"]["items"][item]["track"]["album"]["name"],//←プレイリスト内の曲のアルバム名を抽出
      data["tracks"]["items"][item]["track"]["external_urls"]["spotify"]//←プレイリスト内の曲のURLを抽出
    ];
  }
  
  insertArray(playlistdata);//←Spotifyプレイリストから抽出したデータをGoogle Spreadsheetに書き出し

}


//ggetAccessToken() : SpotifyAPIをコールし、アクセストークンを入手
function getAccessToken() {
  var client_info = Utilities.base64Encode(client_id + ":" + client_secret); 

  var url = "https://accounts.spotify.com/api/token";
  var headers = {
    "Content-Type" : "application/x-www-form-urlencoded;",
    'Authorization': 'Basic ' + client_info,
  };

  var postData = {

  };

  var options = {
    "method" : "post",
    "headers" : headers,
    "payload" : {
      'grant_type': 'client_credentials'
     }
  };

  var authData = JSON.parse(UrlFetchApp.fetch(url, options));
  return authData["access_token"];
  
}


//insertArray() : 抽出したプレイリスト内の楽曲情報をGoogle Spreadsheetに入力
function insertArray(insertdata){
  var output_file = SpreadsheetApp.openById(spreadsheetId);
  var output_sheet = output_file.getSheetByName("PlaylistData");

  var insertdata_lastcolumn = insertdata[1].length; //入力予定配列のカラム数を取得する
  var insertdata_lastrow = insertdata.length;   //入力予定配列の行数を取得する
  
  output_sheet.getRange(output_sheet.getLastRow() + 1,1,insertdata_lastrow,insertdata_lastcolumn).setValues(insertdata);
}