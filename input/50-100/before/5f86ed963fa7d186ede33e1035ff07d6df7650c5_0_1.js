function(dt) {
        this.timeElapsed += dt;
        this.refresh(Math.min(1, this.easing(this.timeElapsed / this.duration)));
        if (this.timeElapsed > this.duration) {
          if (typeof this.callback === "function") {
            this.callback();
          }
          return false;
        } else {
          return true;
        }
      }