function(dt) {
        this.timeElapsed += dt;
        if (this.timeElapsed > this.duration) {
          if (typeof this.callback === "function") {
            this.callback();
          }
          return false;
        } else {
          this.refresh(this.easing(this.timeElapsed / this.duration));
          return true;
        }
      }