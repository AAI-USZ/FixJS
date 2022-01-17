function(username, reponame, callback) {
  requestURL = "https://api.github.com/repos/"+username+"/"+reponame+'/contributors?callback=?';
  $.getJSON(requestURL, function(json, status){
    callback(json.data, status);
  });
}