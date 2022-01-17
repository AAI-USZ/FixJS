function(vector) {

      var angle = this.angleFrom(vector);

      return (angle === null) ? null : (Math.abs(this.angleFrom(vector) - Math.PI/2) < jsMetric.precision);

    }