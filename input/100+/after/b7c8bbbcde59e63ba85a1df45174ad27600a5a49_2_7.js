function() {
      var min = rover.get('min'); 
      var max = rover.get('max');   
      var width = rover.getWidth();
      this.scribl.width = width;
      this.scribl.canvas.width = width;      

      // hack to fix scale bug
      if (min == 1) min = 0;
      this.scribl.scale.min = min;
      this.scribl.scale.max = max;
      
      this.scribl.draw();  
      // var scrollLeft = (rover.get('displayMin') - rover.get('min')) / (rover.get("max") - rover.get('min')) * width;
      // this.$el.scrollLeft(scrollLeft);
   }