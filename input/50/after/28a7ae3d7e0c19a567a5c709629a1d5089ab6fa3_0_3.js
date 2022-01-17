function repeatKeyCallback() {
              if (this.level == 0) {
                clearTimeout(this._timer);
                return;
              }
              this.changeVolume(-1);
            }