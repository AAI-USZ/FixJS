function downloadFile(url, opt) {
  var ret = new Deferred();
  chrome.extension.sendRequest(TBRL.id, {
    request: "download",
    content: {
      "url" : url,
      "opt" : opt
    }
  }, function(res){
    if(res.success){
      ret.callback(res.content);
    } else {
      ret.errback(res.content);
    }
  });
  return ret;
}