function(){
    var d = new Deferred();
    chrome.extension.sendRequest(TBRL.id, {
      request: "config"
    }, function(res){
      d.callback(res);
    });
    return d;
  }