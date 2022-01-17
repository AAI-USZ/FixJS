function(event) {
         var h = (rover.get('max') - rover.get('min')) * this.scrollLeft / rover.getWidth() + rover.get('min');
         var w = rover.getWidth();
         if ( w < 0){
            alert('hi');
         }
         var displayWidthNts = rover.get('displayMax') - rover.get('displayMin');
         var displayMin = (rover.get('max') - rover.get('min')) * this.scrollLeft / rover.getWidth() + rover.get('min');
         rover.set({ 
            displayMin: displayMin,
            displayMax: displayMin + displayWidthNts
         });
      }