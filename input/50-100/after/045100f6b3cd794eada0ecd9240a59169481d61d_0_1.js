function() {
          // Reload recommended feeds every 60 minutes.
          clearInterval(this.locks.load_recommended_feed);
          this.locks.load_recommended_feed = setInterval(_.bind(function() {
              this.load_recommended_feed(0, true);
          }, this), 60*60*1000);
        }