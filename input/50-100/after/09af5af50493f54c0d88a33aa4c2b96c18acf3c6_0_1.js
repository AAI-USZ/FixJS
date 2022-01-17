function(){
          _this.server.respond();
          _this.view.flash({type: 'error', message: 'hello, world!'});
          expect(_this.view.el.find('.alert').html()).toContain('hello, world!');
        }