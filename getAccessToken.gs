//getAccessToken() : SpotifyAPIをコールし、アクセストークンを入手
function getAccessToken(cid, csecret) {
  var client_info = Utilities.base64Encode(cid + ":" + csecret); 

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
