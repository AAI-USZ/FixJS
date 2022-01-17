function () {
          var router = new director.http.Router();
          router.get('/json', { accept: 'application/json' }, handlers.respondWithOk());
          router.get('/txt', { accept: 'text/plain' }, handlers.respondWithOk());
          router.get('/both', { accept: ['text/plain', 'application/json'] }, handlers.respondWithOk());
          router.get('/regex', { accept: /.+\/x\-.+/ }, handlers.respondWithOk());

          router.get('/weird', { accept: 'application/json' }, function () {
            this.res.writeHead(400);
            this.res.end();
          });

          router.get('/weird', handlers.respondWithOk());

          helpers.createServer(router).listen(PORT, this.callback);
        }