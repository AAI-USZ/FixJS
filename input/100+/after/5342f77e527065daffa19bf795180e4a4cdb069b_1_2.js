function(matrix) {

      matrix = Matrix.create(matrix);

      if (!this.isSameSizeAs(matrix)) {

        return null;

      } else {

        var new_els = [], i, j;

        for (i = 1; i <= this.rows(); i++) {

          new_els[i - 1] = [];

          for (j = 1; j <= this.cols(); j++) {

            new_els[i - 1].push(this.e(i,j) + matrix.e(i,j));

          }

        }

        return Matrix.create(new_els);

      }

    }