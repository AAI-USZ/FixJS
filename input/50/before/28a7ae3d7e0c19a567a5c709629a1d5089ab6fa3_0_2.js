function repeatKeyCallback() {
              if (this.currentVolume == 10) {
                clearTimeout(this._timer);
                return;
              }
              this.changeVolume(1);
            }