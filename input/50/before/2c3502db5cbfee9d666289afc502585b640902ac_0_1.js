function(){
        if (this.visible) {
          this.pre();
          this.drawImpl();
          this.post();
        }
      }