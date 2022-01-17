function(){
          _this.server.responses = [];
          _this.server.respondWith('GET', _this.url, TestResponses.chat.archived);
          _this.server.respond();
        }