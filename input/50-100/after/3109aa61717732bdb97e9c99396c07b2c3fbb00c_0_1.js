function(dt) {
        timeElapsed += dt;
        this.refresh(this.easing(timeElapsed / duration));
        if (timeElapsed > duration) {
          console.log("timeElapsed > duration");
          if (typeof this.callback === "function") {
            this.callback();
          }
          return false;
        } else {
          return true;
        }
      }