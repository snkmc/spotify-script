//getUsersPlaylists() : SpotifyのAPIをコールし、ユーザのプレイリスト一覧(最大50件分)を入手
function getUsersPlaylists(usid) {
  var url = "https://api.spotify.com/v1/users/" + usid + "/playlists?limit=50";
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
  
  for(var item in data["items"]) {
    if(searchRecord(data["items"][item]["external_urls"]["spotify"])){
    } else {
      getPlaylistData(data["items"][item]["id"]);
    }
  }
}


//searchRecord() : 抽出したプレイリスト内の楽曲情報をGoogle Spreadsheetに入力
function searchRecord(id){
  var output_file = SpreadsheetApp.openById(spreadsheetId);
  var output_sheet = output_file.getSheetByName("PlaylistData");
  
  var search_column = output_sheet.getRange(1, 2, output_sheet.getLastRow()).getValues();

  // 配列の最後までループ
  for (var i =0, len = search_column.length; i < len; i++) {
    if (id == search_column[i]) {
      // 存在したらtrueを返す
      return true;
    }
  }
  // 存在しない場合falseを返す
  return false;
}