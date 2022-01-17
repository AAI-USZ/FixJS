function(matrix) {

      matrix = Matrix.create(matrix);

      return (this.dimensions().rows == matrix.dimensions().rows &&

          this.dimensions().cols == matrix.dimensions().cols);

    }