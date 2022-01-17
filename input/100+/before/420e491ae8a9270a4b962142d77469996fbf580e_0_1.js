function(){
          var el = _this.view.el;
          console.log(el);
          _this.server.respond();
          expect(el.find('div.closed').length).toBeTruthy();
          _this.server.responses = [];
          _this.server.respondWith('GET', _this.url, TestResponses.chat.open);
          _this.view.pollForOpenness();
          _this.server.respond();
          expect(el.find('form').length).toBeTruthy();
        }