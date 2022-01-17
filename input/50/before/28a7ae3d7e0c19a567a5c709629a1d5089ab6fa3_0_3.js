function repeatKeyCallback() {
              if (this.currentVolume == 0) {
                clearTimeout(this._timer);
                return;
              }
              this.changeVolume(-1);
            }