function(track) {
           var collection = this.collection;
           var view = new BTrackView({
              model: track,
              collection: collection,
              rover: rover
           });
           
           this.$('#rover-canvas-list').append(view.render().el);                     
        }