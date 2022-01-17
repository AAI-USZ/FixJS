function(vector) {

      if (this.dimensions() != vector.dimensions()) {

        return null;

      } else {

        var elements = [];

        for (var i = 1; i <= this.dimensions(); i++) {

          elements.push(this.e(i) + vector.e(i));

        }

        return Vector.create(elements);

      }

    }