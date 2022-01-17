function(username, reponame, labels, callback) {
  requestURL = "https://api.github.com/repos/"+username+"/"+reponame+'/issues?labels='+labels+'&callback=?';
  $.getJSON(requestURL, function(json, status){
    callback(json.data, status);
  });
}