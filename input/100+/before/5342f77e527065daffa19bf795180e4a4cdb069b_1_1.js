function(args) {

  

    // Returns element i of the vector

    this.e = function(i) {

      return this.elements[i - 1];

    };

    

    // Returns the number of elements the vector has

    this.dimensions = function() {

      return this.elements.length;

    };

    

    // Returns the modulus ('length') of the vector

    this.modulus = function() {

      var r = 0;

      for (i = 1; i <= this.dimensions(); i++) {

        r += Math.pow(this.e(i), 2);

      }

      return Math.sqrt(r);

    };

    

    // Set vector's elements from an array

    this.setElements = function(args) {

      this.elements = [];

      for (var i = 0; i < args.length; i++) {

        if (!isNaN(args[i])) { this.elements.push(args[i]); }

      }

    };

    

    // Construct the vector

    this.setElements(args);

    

    // Returns true iff the vector is equal to the argument

    this.eql = function(vector) {

      return (this.inspect() == vector.inspect());

    };

    

    // Returns a copy of the vector

    this.dup = function() {

      return Vector.create(this.elements);

    };

    

    // Alters the vector so that its modulus is unity. Returns the vector

    this.normalize = function() {

      var new_elements = [];

      for (var i = 0; i < this.dimensions(); i++) {

        new_elements.push(this.elements[i]/this.modulus());

      }

      this.setElements(new_elements);

      return this;

    };

    

    // Returns a new vector created by normalizing the receiver

    this.toUnitVector = function() {

      return this.dup().normalize();

    };

    

    // Returns the angle between the vector and the argument (also a vector)

    this.angleFrom = function(vector) {

      var dot = this.dot(vector);

      return (dot === null) ? null : Math.acos(this.dot(vector) / (this.modulus() * vector.modulus()));

    };

    

    // Returns true iff the vector is parallel to the argument

    this.isParallelTo = function(vector) {

      var angle = this.angleFrom(vector);

      return (angle === null) ? null : (this.angleFrom(vector) < jsMetric.precision);

    };

    

    // Returns true iff the vector is perpendicular to the argument

    this.isPerpendicularTo = function(vector) {

      var angle = this.angleFrom(vector);

      return (angle === null) ? null : (Math.abs(this.angleFrom(vector) - Math.PI/2) < jsMetric.precision);

    };

    

    // Returns the result of adding the argument to the vector

    this.add = function(vector) {

      if (this.dimensions() != vector.dimensions()) {

        return null;

      } else {

        var elements = [];

        for (var i = 1; i <= this.dimensions(); i++) {

          elements.push(this.e(i) + vector.e(i));

        }

        return Vector.create(elements);

      }

    };

    

    // Returns the result of subtracting the argument from the vector

    this.subtract = function(vector) {

      return this.add(vector.x(-1));

    };

    

    // Returns the result of multiplying the elements of the vector by the argument

    this.multiply = function(k) {

      var new_elements = [];

      for (var i = 1; i <= this.dimensions(); i++) {

        new_elements.push(k * this.e(i));

      }

      return Vector.create(new_elements);

    };

    

    this.x = function(k) { return this.multiply(k); };

    

    // Returns the scalar product of the vector with the argument

    // Both vectors must have equal dimensionality

    this.dot = function(vector) {

      var i, product = 0;

      if (this.dimensions() != vector.dimensions()) {

        return null;

      } else {

        for (i = 1; i <= this.dimensions(); i++) {

          product += this.e(i) * vector.e(i);

        }

        return product;

      }

    };

    

    // Returns the vector product of the vector with the argument

    // Both vectors must have dimensionality 3

    this.cross = function(vector) {

      if (this.dimensions() != 3 || vector.dimensions() != 3) {

        return null;

      } else {

        return Vector.create(

          (this.e(2) * vector.e(3)) - (this.e(3) * vector.e(2)),

          (this.e(3) * vector.e(1)) - (this.e(1) * vector.e(3)),

          (this.e(1) * vector.e(2)) - (this.e(2) * vector.e(1))

        );

      }

    };

    

    // Returns the (absolute) largest element of the vector

    this.max = function() {

      var m = 0;

      for (var i = 1; i <= this.dimensions(); i++) {

        if (Math.abs(this.e(i)) > Math.abs(m)) { m = this.e(i); }

      }

      return m;

    };

    

    // Returns the index of the first match found

    this.indexOf = function(x) {

      var index = null, i;

      for (i = 1; i <= this.dimensions(); i++) {

        if (index === null && this.e(i) == x) {

          index = i;

        }

      }

      return index;

    };

    

    // Returns a diagonal matrix with the vector's elements as its diagonal elements

    this.toDiagonalMatrix = function() {

      return Matrix.Diagonal(this.elements);

    };

    

    // Returns the result of rounding the elements of the vector

    this.round = function() {

      var new_elements = [];

      for (var i = 1; i <= this.dimensions(); i++) {

        new_elements.push(Math.round(this.e(i)));

      }

      return Vector.create(new_elements);

    };

    

    // Returns a string representation of the vector

    this.inspect = function() {

      return '[' + this.elements.join(', ') + ']';

    };

  }