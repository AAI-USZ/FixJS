function(load, undefined){
  var config = {
        path: "."
      };
  global.require = function(id){
    id = require.resolve(id);
    if(id in require.cache){
      return require.cache[id];
    }
    return require.cache[id] = load(undefined, id);
  };
  require.cache = {};
  require.getRequest = function(file, async, post){
    var xhr;
    if(global.XMLHttpRequest){
      xhr = new XMLHttpRequest();
    }
    else if(global.ActiveXObject){
      xhr = new ActiveXObject("MSXML2.XMLHTTP");//Microsoft.XMLHTTP
    }
    if(xhr){
      if(post){
        xhr.open("POST", file, async);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.setRequestHeader("Content-Length", post.length);
        xhr.setRequestHeader("Connection", "close");
      }
      else{
        xhr.open("GET", file, async);
      }
    }
    return xhr;
  };
  require.readFile = function(file){
    var xhr = this.getRequest(file);
    xhr.send();
    return xhr.responseText;
  };
  require.resolve = function(id){
    if(id.indexOf("/")===-1){
      id = config.path+"/"+id;
    }
    if(id.indexOf(".")<1){
      id += ".js";
    }
    return id;
  };
}