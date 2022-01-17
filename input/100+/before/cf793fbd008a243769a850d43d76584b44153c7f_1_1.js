function(url, callback){
  var callback, xhr;
  callback || (callback = function(){});
  xhr = new XMLHttpRequest;
  xhr.open('GET', url, true);
  if (__in('overrideMimeType', xhr)) {
    xhr.overrideMimeType('text/plain');
  }
  xhr.onreadystatechange = function(){
    var __ref;
    if (xhr.readyState === 4) {
      if ((__ref = xhr.status) == 200 || __ref == 0) {
        LiveScript.stab(xhr.responseText, callback, url);
      } else {
        callback(Error(url + ": " + xhr.status + " " + xhr.statusText));
      }
    }
  };
  xhr.send(null);
  return xhr;
}