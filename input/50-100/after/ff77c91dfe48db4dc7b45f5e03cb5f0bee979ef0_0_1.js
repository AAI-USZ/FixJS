function(line,ip,port){
      var l = jsonParse(line);
      if(!l) return;

      if(!l.file) l.file = '/unknown.log';
      if(!l.time) l.time = Date.now();
      l.now = Date.now();
      l.ip = ip;
      l.port = port;

      writeLine(l,files,dir);
  }