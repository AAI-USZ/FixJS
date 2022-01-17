function(event) {
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
      }