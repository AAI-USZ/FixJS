function() {
      if(!this.canvas){
        this.canvas = dom.byId(this.canvasId);
      }
      if(!this.canvas){
        alert('Sorry, your browser does not support canvas.  I recommend any browser but Internet Explorer');
        return;
      }
      if(!this.context){
        this.context = this.canvas.getContext(this.contextType);
      }
      if(!this.canvas){
        alert('Sorry, your browser does not support a ' + this.contextType + ' drawing surface on canvas.  I recommend any browser but Internet Explorer');
        return;
      }
      //try using game object's dimensions, or set dimensions to canvas if none are specified
      if(this.height){
        this.canvas.height = this.height;
      } else {
        this.height = this.canvas.height;
      }
      if(this.width){
        this.canvas.width = this.width;
      } else {
        this.width = this.canvas.width;
      }
      if(!this.inputManager){
        this.inputManager = new mwe.InputManager({
          canvas: this.canvas
        });
      }
      this.initInput(this.inputManager);
      this.isRunning = true;
    }