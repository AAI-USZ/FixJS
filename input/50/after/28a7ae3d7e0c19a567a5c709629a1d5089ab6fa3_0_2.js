function repeatKeyCallback() {
              if (this.level == 10) {
                clearTimeout(this._timer);
                return;
              }
              this.changeVolume(1);
            }