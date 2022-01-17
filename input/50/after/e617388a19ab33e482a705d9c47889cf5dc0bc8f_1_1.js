function(){
    var d = new Deferred();
    chrome.extension.sendMessage(TBRL.id, {
      request: "config"
    }, function(res){
      d.callback(res);
    });
    return d;
  }