function(msg, meta, send) {
          var handleError, msgLogName, req;
          msg = JSON.parse(msg);
          req = {
            id: msg.id,
            method: msg.m,
            params: msg.p,
            socketId: meta.socketId,
            clientIp: meta.clientIp,
            sessionId: meta.sessionId,
            transport: meta.transport,
            receivedAt: Date.now()
          };
          msgLogName = ("rpc:" + req.id).grey;
          ss.log('↪'.cyan, msgLogName, req.method);
          handleError = function(e) {
            var message, obj;
            message = (meta.clientIp === '127.0.0.1') && e.stack || 'See server-side logs';
            obj = {
              id: req.id,
              e: {
                message: message
              }
            };
            ss.log('↩'.red, msgLogName, req.method, e.message.red);
            if (e.stack) {
              ss.log(e.stack.split("\n").splice(1).join("\n"));
            }
            return send(JSON.stringify(obj));
          };
          try {
            return request(req, function(err, response) {
              var obj, timeTaken;
              if (err) {
                return handleError(err);
              }
              obj = {
                id: req.id,
                p: response,
                e: req.error
              };
              timeTaken = Date.now() - req.receivedAt;
              ss.log('↩'.green, msgLogName, req.method, ("(" + timeTaken + "ms)").grey);
              return send(JSON.stringify(obj));
            });
          } catch (e) {
            return handleError(e);
          }
        }