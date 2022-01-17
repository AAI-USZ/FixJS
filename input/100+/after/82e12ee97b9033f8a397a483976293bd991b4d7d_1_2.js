function(){
        var self = this;

        this.opened = this.infoOptions.opened;
        this.infoOptions.position = null;

        if(typeof this.options.content === 'string'){
          if(this.infoOptions.useInfobox){
            this.setInfo(new InfoBox(this.infoOptions), this.opened);
          } else {
            this.setInfo(new google.maps.InfoWindow(this.infoOptions), this.opened);
          }
        } else if (this.options.content instanceof InfoBox || this.options.content instanceof google.maps.InfoWindow) {
          this.setInfo(this.options.content, this.opened);
        } else {
          this.info = null;
        }

        if(this.options.toggleInfoOnClick){
          this.isClickable = true;
          this.marker.setClickable(true);
          this.clickEvent = google.maps.event.addListener(this.marker, "click", function(event) {
            if(self.opened){
              self.close();
            } else {
              self.open();
            }
          });
        } else {
          console.log("OK");
          //this.isClickable = false;
          //this.marker.setClickable(false);
          //if(typeof this.clickEvent === 'object'){
          //  google.maps.event.removeListener(this.clickEvent);
          //}
        }

        this.delayedInfobox = false;
        
        google.maps.event.addListener(this.marker, "dragstart", function(event) {
          self.hide();
        });

        google.maps.event.addListener(this.marker, "dragend", function(event) {
          if(!self.infoVisible){
            self.show();
          }
        });

        google.maps.event.addListener(this.marker, "hide", function(event) {
          self.info.close();
        });

       google.maps.event.addListener(this.marker, "open", function(event){
          (self.events.open) ? self.events.open.apply(self, [event]) : null;
        });

        google.maps.event.addListener(this.marker, "close", function(event){
          (self.events.close) ? self.events.close.apply(self, [event]) : null;
        });
      }