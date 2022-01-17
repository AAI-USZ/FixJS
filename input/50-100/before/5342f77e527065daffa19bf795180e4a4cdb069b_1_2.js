function(k) {

      var new_elements = [];

      for (var i = 1; i <= this.dimensions(); i++) {

        new_elements.push(k * this.e(i));

      }

      return Vector.create(new_elements);

    }