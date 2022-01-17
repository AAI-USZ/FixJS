function() {
  
  var factor = 9;
  var min_proximity = 4;
  var _this = this;
  
  // nbody code acceleration accumulation
  _(this.particles).each(function(a, idx) {
    var rest = _.rest(_this.particles, idx);
    _(rest).each(function(b) {
      var vec = a.position.sub(b.position);
      var length = vec.length();
      vec.idiv(Math.pow(length, 3)/factor); // scale the vector to the inverse square distance

      // safeguard for execessive integration error
      if(length > min_proximity) {
          b.acceleration.iadd(vec);
          a.acceleration.isub(vec);
      }
    });
    a.step();
  }); 
}