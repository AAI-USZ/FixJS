function(){
        var eventos = this;

        this.canvas.onclick = function(e) {
          eventos.click_de_mouse.emitir({x: e.clientX, y:e.clientY});
        };

        this.canvas.onmousemove = function(e) {
          eventos.mueve_mouse.emitir({x: e.clientX, y:e.clientY});
        };
      }