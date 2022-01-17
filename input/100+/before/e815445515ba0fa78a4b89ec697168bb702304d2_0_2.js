function() {
  var blast, buffer, counter, footer, header, http, io, pageString, port, server;

  http = require('http');

  counter = 0;

  blast = ['data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAZAAAAAUAgMAAADeh4MlAAAAAXNSR0IArs4c6QAAAAlQTFRFpGN1/wAA8P8AGDtHmgAAAAF0Uk5TAEDm2GYAAABRSURBVDjLY2AYBSAgGhpCD0tCHehhSQCt7WDNWrWUHpaspHmkcK2ivSWMUatWrRq1hJQ4ob0lwNRFF0uW0r5cEQ2jfWakW9lFh7KeHkX9YAIAVCcbn7esZH4AAAAASUVORK5CYII=', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAZAAAAAUAgMAAADeh4MlAAAAAXNSR0IArs4c6QAAAAlQTFRFpGMV/wAA8P8Ak40LfwAAAAF0Uk5TAEDm2GYAAABPSURBVDjLY2AYBUiANTSULpYE0MOSEFrbwRi1aiU9LFlF80hhWkUHS8KAlkwdtYSUOJlKj9RFD0tWhtIhx9M+M9Kt7HKgfTEsSoeiflAAAAXTHFOczYJ/AAAAAElFTkSuQmCC', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAZAAAAAUAgMAAADeh4MlAAAAAXNSR0IArs4c6QAAAAlQTFRFpGPk/wAA8P8AUYQ6EgAAAAF0Uk5TAEDm2GYAAABPSURBVDjLY2AYBRiANTSULpYE0MOSEFrbwRi1aiU9LFlF80hhWkUHS8KAlkwdtYSUOJlKj9RFD0tWhtIhx9M+M9Kt7HKgfTEsSoeifoABAFvYHFOMa+WjAAAAAElFTkSuQmCC', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAZAAAAAUAgMAAADeh4MlAAAAAXNSR0IArs4c6QAAAAlQTFRFpGO3/wAA8P8AQ7nJOAAAAAF0Uk5TAEDm2GYAAABPSURBVDjLY2AYBbgAa2goXSwJoIclIbS2gzFq1Up6WLKK5pHCtIoOloQBLZk6agkpcTKVHqmLHpasDKVDjqd9ZqRb2eVA+2JYlA5F/UABAJWLHFPEkf8jAAAAAElFTkSuQmCC', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAZAAAAAUAgMAAADeh4MlAAAAAXNSR0IArs4c6QAAAAlQTFRFpGOV/wAA8P8AG5vhjQAAAAF0Uk5TAEDm2GYAAACCSURBVDjLvdWxDcMwDERRQoAKewAXGUFTZAQXYgqPkCm8BHuW0U0ZeYivW+ABOlI0g9NuWihpLesbRmRtOI7kS4EjOhQnXbvEI0VxRccnONw7/lrh3w7XLo0VyAyN2OaX8OLrAqQMx0f4aeVDL+Oz76I/SCkPHknbcWRm/9UFyLyMf8aLM/aV2LSgAAAAAElFTkSuQmCC', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABAQMAAAAl21bKAAAAAXNSR0IArs4c6QAAAANQTFRFAAAAp3o92gAAAAF0Uk5TAEDm2GYAAAAKSURBVAjXY2AAAAACAAHiIbwzAAAAAElFTkSuQmCC'];

  header = '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="user-scalable=no, width=device-width" />\n  <title>tappe.lu</title>\n\n  <link href="/css/layout.css" media="screen" rel="stylesheet" type="text/css" >\n</head>\n<body>';

  footer = '\n<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js"></script>\n<!--[if IE]><script src="/js/html5.js"></script><![endif]-->\n<script src="/js/mt.js"></script> <!-- Mersenne Twister for seedable random -->\n<script src="/socket.io/socket.io.js"></script>\n<script src="/js/larva.js"></script>\n<script src="/js/site.js"></script>\n<audio preload="auto" autobuffer audio="true" src="Nerf_Herder_-_Stand_By_Your_Manatee.mp3">\n<source src="Nerf_Herder_-_Stand_By_Your_Manatee.ogg" type="audio/ogg; codecs=vorbis" />\n<source src="Nerf_Herder_-_Stand_By_Your_Manatee.mp3" type="audio/mpeg" />\n</audio>\n</body></html>';

  pageString = function() {
    var content;
    return header + "  " + (((function() {
      var _i, _len, _results;
      _results = [];
      for (_i = 0, _len = arguments.length; _i < _len; _i++) {
        content = arguments[_i];
        _results.push(content);
      }
      return _results;
    }).apply(this, arguments)).join("\n  ")) + footer;
  };

  port = parseInt(process.argv[2], 10);

  server = http.createServer(function(req, res) {
    var page, responseString;
    res.writeHead(200, {
      'Content-Type': 'text/html'
    });
    page = ['<canvas id="canvas" width="1920" height="1200"></canvas>', '<div><input type="button" value="music" class="music" /><input type="button" value="animation" class="animation" />', '<a href="http://oglio.com/nerf-herder-iv">Nerf Herder - (Stand By Your) Manatee</a>', '<textarea>Manatee chat pool\narrow keys or touch\nedit this textarea\ndrag an image here</textarea></div>'];
    responseString = pageString.apply(null, page);
    return res.end(responseString);
  });

  server.listen(port);

  io = (require('socket.io')).listen(server);

  io.configure('production', function() {
    io.enable('browser client etag');
    io.set('log level', 1);
    return io.set('transports', ['websocket', 'flashsocket', 'htmlfile', 'xhr-polling', 'jsonp-polling']);
  });

  buffer = {};

  io.sockets.on('connection', function(socket) {
    var id, message;
    for (id in buffer) {
      message = buffer[id];
      socket.emit('player', message);
    }
    socket.on('player', function(message) {
      var broadcast, key, value;
      message.id = socket.id;
      broadcast = {};
      if (buffer[socket.id]) {
        for (key in message) {
          value = message[key];
          if ((value != null) && (typeof value !== 'string' || value.length < 8096)) {
            buffer[socket.id][key] = value;
            if (key === 'x' || key === 'y') {
              buffer[socket.id].dx = 0;
              buffer[socket.id].dy = 0;
            }
            broadcast[key] = value;
          }
        }
      } else {
        buffer[socket.id] = message;
      }
      return socket.broadcast.emit('player', broadcast);
    });
    socket.on('animation', function(message) {
      var animInterval, animPos, emitFrame;
      if (message.type !== 'blast') return;
      animPos = 0;
      emitFrame = function(pos) {
        socket.broadcast.volatile.emit('player', {
          id: socket.id,
          image: blast[pos]
        });
        return socket.volatile.emit('you', {
          image: blast[pos]
        });
      };
      return animInterval = setInterval(function() {
        emitFrame(animPos);
        animPos += 1;
        if (animPos === blast.length - 1) {
          clearInterval(animInterval);
          return setTimeout(function() {
            return emitFrame(animPos);
          }, 250);
        }
      }, 100);
    });
    return socket.on('disconnect', function() {
      message = buffer[socket.id];
      if (!message) return;
      message.x = 10000;
      message.y = 10000;
      socket.broadcast.emit('player', message);
      return delete buffer['' + socket.id];
    });
  });

  console.log('Server running at *:' + port);

}