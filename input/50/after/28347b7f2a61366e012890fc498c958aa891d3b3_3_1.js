function(e) {
          this.model.set({ edit:false });
          if(this.model.get('url') == undefined)
            this.removeTrack();
       }