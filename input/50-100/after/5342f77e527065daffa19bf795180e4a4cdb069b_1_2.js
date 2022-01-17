function(vector) {

      var i, product = 0;

      if (this.dimensions() != vector.dimensions()) {

        return null;

      } else {

        for (i = 1; i <= this.dimensions(); i++) {

          product += this.e(i) * vector.e(i);

        }

        return product;

      }

    }