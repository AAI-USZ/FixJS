function() {
      _.bindAll(this, 'render', 'draw', 'scroll');
      this.model.bind('change:min change:max', this.draw);
   //   this.model.bind('change:displayMin', this.scroll)
      this.template = Handlebars.compile( $('#scale-template').html() );
      this.scribl = new Scribl(undefined, rover.getWidth());
      this.scribl.offset = 0;
      this.scribl.scale.font.size = 11;
      this.scribl.scale.font.color = 'rgb(220,220,220)';
      this.scribl.tick.major.color = 'rgb(220,220,220)';
      this.scribl.tick.minor.color = 'rgb(220,220,220)';
      this.scribl.tick.halfColor = 'rgb(220,220,220)';
      this.scribl.scale.size = 8;
      this.scribl.scale.auto = false;

      this.$el.scroll(function(event) {
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
      });
   }