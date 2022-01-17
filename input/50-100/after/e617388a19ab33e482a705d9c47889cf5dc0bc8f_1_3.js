function base64ToFileEntry(data) {
  var ret = new Deferred();
  chrome.extension.sendMessage(TBRL.id, {
    request: "base64ToFileEntry",
    content: data
  }, function(res){
    ret.callback(res);
  });
  return ret;
}