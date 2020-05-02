var clientID = '***'//←Spotify APIのClient ID
var clientSecret = '***'//←Spotify APIのClient Secret

var playlistID = '***'//←SpotifyプレイリストのIDを入れる


function getPlaylistData() { //SpotifyのAPIをコールし、プレイリスト内の楽曲情報を入手
  
  var url = "https://api.spotify.com/v1/playlists/" + playlistID + "/tracks";
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
  var playlistData = [];
  
  for(var item in data["items"]) {
    playlistData[item] = [
      data["items"][item]["track"]["artists"][0]["name"],
      data["items"][item]["track"]["name"],
      data["items"][item]["track"]["duration_ms"],
      data["items"][item]["track"]["album"]["name"]
    ];
  }
 
  Logger.log(playlistData);
}

function getAccessToken() { //SpotifyAPIをコールし、アクセストークンを入手
  var client_info = Utilities.base64Encode(clientID + ":" + clientSecret); 

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