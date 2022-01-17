function() {
      
      this._super();
      
      if (this.path_points.length === 0) {
        console.log("killing drone");
        this.kill();
        return;
      }
      
      var next_step = this.path_points.shift();
      
      this.x = next_step[0];
      this.y = next_step[1];
    }