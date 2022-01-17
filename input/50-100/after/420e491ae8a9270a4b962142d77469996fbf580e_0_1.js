function(){
        _this.server.responses = [];
        _this.server.respondWith('GET', _this.url, TestResponses.chat.error);
        _this.server.respond();
        expect(_this.view.el.find('div.crashed').length).toBeTruthy();
      }