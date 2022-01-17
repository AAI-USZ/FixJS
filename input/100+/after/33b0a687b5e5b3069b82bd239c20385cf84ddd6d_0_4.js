function(e) {
          var delta = 0;
          this.prevTime = this.prevTime || new Date().getTime();
    
          try {
              this._zoomDiv.scrollTop = 1000;
              this._zoomDiv.dispatchEvent(e);
              delta = 1000 - this._zoomDiv.scrollTop;
          } catch (error) {
              delta = e.wheelDelta || (-e.detail * 5);
          }
    
          // limit mousewheeling to once every 200ms
          var timeSince = new Date().getTime() - this.prevTime;
    
          if (Math.abs(delta) > 0 && (timeSince > 200) && !this.precise) {
              var point = MM.getMousePoint(e, this.map);
              this.mapModel.zoomBy(delta > 0 ? 1 : -1);

              this.prevTime = new Date().getTime();
          } else if (this.precise) {
              this.mapModel.zoomBy(delta * 0.001);
          }
    
          // Cancel the event so that the page doesn't scroll
          return MM.cancelEvent(e);
      }