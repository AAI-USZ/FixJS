function(matrix) {

      matrix = Matrix.create(matrix);

      return (this.inspect() == matrix.inspect());

    }