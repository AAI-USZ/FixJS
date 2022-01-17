function (req, res) {

  var pathname = require('url').parse(req.url).pathname;
  var secret = pathname.split("/")[2];
  if (secret && secret.endsWith(".json")){
    secret = secret.substr(0, secret.length - 5);
    res.requestsJson = true;
  }        
  var filename = pathname.split("/")[3] || null
  var query = require('url').parse(req.url, true).query;    
  var device = query.device_id || guid();  
  
  //console.log(req.method + ": " + util.inspect(secret) + " " + filename);

  if (watchers[secret] === undefined) watchers[secret] = [];
  if (waitingReceivers[secret] === undefined) waitingReceivers[secret] = [];
  if (messagecache[secret] === undefined) messagecache[secret] = [];

  if (req.method === 'GET' && pathname.indexOf('/api') == 0) {

    if (query.watch == 'listeners') {

      if (waitingReceivers[secret].length != query.count){
        res.writeHead(200, header);
        res.end(waitingReceivers[secret].length + '\n');
      } else{
        res.knownNumberOfListeners = query.count;
        watchers[secret].push(res);
      }
      track("watch-listeners");
      return;
    }
    
    if (filename === null){
    
      if (res.requestsJson){
        var messages = [];
        var since = 0;
        messagecache[secret].forEach(function(msg, i){
          if (query.since === msg.id)
            since += i+1;
          if (msg.sender !== device)
            messages.push(msg);
          else
            since--;
        });
        if (since > 0)
          messages = messages.splice(since);
        if (messages.length > 0){
          res.writeHead(200);
          res.end(JSON.stringify(messages));
          return;
        }
      }

      req.connection.on('close',function(){
         res.aborted = true;
         track("get-aborted");
        
         var livingwaitingReceivers = [];
         waitingReceivers[secret].forEach(function(response){
           if (!response.aborted) livingwaitingReceivers.push(response);
         });

         waitingReceivers[secret] = livingwaitingReceivers;        
         updateWatchers(secret);
      });
  
      res.device = device;
      
      // if not asking for a file we will wait for the shared data
      waitingReceivers[secret].push(res); 
      track("get-waiting");
      
      updateWatchers(secret);
      return;
    }

    if (filename === "recent-data.json"){
      res.writeHead(200);
      res.end(JSON.stringify(messagecache[secret]));
      return;

    } else if (filecache[pathname] != undefined){
      var file = growingfile.open(filecache[pathname].path);
      res.writeHead(200, { 
        'Content-Type': (filecache[pathname].mimetype || filecache[pathname].mime),
        //'Content-Length': filecache[pathname].size
      });
      file.pipe(res);
    } else {
      res.writeHead(404);
      track("get-file-404");
      res.end();
    }
 
  } else if (req.method === 'PUT' && pathname.indexOf('/api') == 0) {
    //console.log("PUT waitingReceivers  " + waitingReceivers[secret].length);

    
    req.on('data', function(chunk) {

      var keepFor = (query.keep_for || 60);
      var msg = {data: chunk.toString(), id: guid(), sender: device};
      messagecache[secret].push(ce.clone(msg));
      setTimeout(function(){
       messagecache[secret].splice(messagecache[secret].indexOf(msg), 1);
      }, 1000 * keepFor );

      var receiverWhoSendsTheData;
      waitingReceivers[secret].forEach(function(response){
        if (response.device !== device || !device){
          response.writeHead(200, header);
          track("get-200");
          if (response.requestsJson)
            response.end(JSON.stringify([msg]));
          else
            response.end(chunk);
        } else
          receiverWhoSendsTheData = response;
      });

      track("put-" + waitingReceivers[secret].length);

      res.writeHead(200, header);
      
      msg.deliveries = (waitingReceivers[secret].length - (receiverWhoSendsTheData ? 1 : 0));
      if (res.requestsJson){
          msg.keep_for = keepFor; 
          res.end(JSON.stringify(msg));
      } else
          res.end( msg.deliveries + '\n');

      if (receiverWhoSendsTheData)
        waitingReceivers[secret] = [receiverWhoSendsTheData];
      else
        waitingReceivers[secret] = [];

      updateWatchers(secret);
   });

  } else if (req.method === 'POST' && pathname.indexOf('/api') == 0) {

    if (!filename) {
      track("post-403");
      res.writeHead(403);
      res.end();
      return;
    }
    
    var form = new formidable.IncomingForm();
      form.parse(req, function(err, fields, files) {
        if (err) {
          res.writeHead(500); res.end();
          track("post-500");
          return;
        }
        var file = files.file || files.data;
        if (!filecache[pathname]) {
          filecache[pathname] = file;
          mime.fileWrapper(filecache[pathname].path + ".pdf", function (err, type) {
            if (err)
                filecache[pathname].mimetype = require('mime').lookup(pathname);
            else
              filecache[pathname].mimetype = type;
          });
        }      
        res.writeHead(200, {'content-type': 'text/plain'});
        res.end('{"url": "'+ pathname + '"}');
        track("post-200");
        console.log("parse: " + util.inspect(filecache[pathname]));
        filecache[pathname].size = file.length;
        setTimeout(function(){ 
          fs.unlink(file.path);
        }, 10 * 60 * 1000);
      });
      
      form.on('fileBegin', function(name, file){
        filecache[pathname] = file;
        console.log("begin: " + util.inspect(filecache[pathname]));
      });


      form.on('progress', function(received, expected){
        if (received > 10 && filecache[pathname] && !filecache[pathname].mimetype){
          console.log("prog: " + util.inspect(filecache[pathname]));
          mime.fileWrapper(filecache[pathname].path + ".pdf", function (err, type) {
            if (err)
                filecache[pathname].mimetype = require('mime').lookup(pathname);
            else
              filecache[pathname].mimetype = type;
          //filecache[pathname].size = expected  - 300;
          });
        }
      });

  }

  if (pathname.indexOf('/api') == 0) return;

  var filePath = '.' + req.url;
  if (filePath == './')
    filePath = './index.html';
  filePath = 'web-client/' + filePath;    

    var extname = path.extname(filePath);
    var contentType = 'text/html';
    switch (extname) {
        case '.png':
            contentType = 'image/png';
            break;
        case '.ico':
            contentType = 'image/x-icon';
            break;
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
    }
     
    fs.exists(filePath, function(exists) {
     
        if (exists) {
            fs.readFile(filePath, function(error, content) {
                if (error) {
                    res.writeHead(500);
                    res.end();
                }
                else {
                    res.writeHead(200, { 'Content-Type': contentType });
                    res.end(content, 'utf-8');
                }
            });
        }
        else {
            res.writeHead(404);
            res.end();
        }
    });


}