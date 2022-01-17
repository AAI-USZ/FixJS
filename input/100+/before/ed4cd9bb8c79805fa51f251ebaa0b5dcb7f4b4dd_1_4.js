function() {

           var $tracks,
               collection = this.collection;
            
            // keeps displayMin and displayMax in sync as this
            // view scrolls
           $(this.el).html(this.template({}));
           this.$('#rover-canvas-list').scroll(function(event) {
              var displayWidthNts = rover.get('displayMax') - rover.get('displayMin');
              var displayMin = (rover.get('max') - rover.get('min')) * this.scrollLeft / rover.getWidth() + rover.get('min');
              rover.set(
                 { 
                    displayMin: displayMin,
                    displayMax: displayMin + displayWidthNts,
                 },
                 {
                    uid: event.currentTarget.dataset.uid
              });
           });           
           
           
           // tracks
           $tracks = this.$('#rover-canvas-list');
           collection.each(function(track){
              var view = new BTrackView({
                 model: track,
                 collection: collection,
                 rover: rover
              });
              $tracks.append(view.render().el);
           });
           return this;
        }