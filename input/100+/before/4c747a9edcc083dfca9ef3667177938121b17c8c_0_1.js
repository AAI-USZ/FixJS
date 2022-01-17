function(api) {
    var path = {};

    api = api.split('\n'); 
    api.shift();
    api.pop();
    
    (function every(list) {
      var item = list.shift();

      if(!item) return;
      
      item = item.replace(/[.*\n]/g, '').split(' ');
      
      var cmd = item.shift();
      
      if(plugins[cmd]) {
        plugins[cmd](path, item);
      }
      
      every(list);
    })(api.join('\n').split(';'));
    
    config.push(path);

  }