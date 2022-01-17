function(els) {

  

    // Returns element (i,j) of the matrix

    this.e = function(i,j) {

      return this.elements[i - 1][j - 1];

    };

    

    // Returns row k of the matrix as a vector

    this.row = function(k) {

      if (k > this.dimensions().rows) {

        return null;

      } else {

        return Vector.create(this.elements[k - 1]);

      }

    };

    

    // Returns column k of the matrix as a vector

    this.col = function(k) {

      if (k > this.dimensions().cols) {

        return null;

      } else {

        var col = [];

        for (var i = 1; i <= this.dimensions().rows; i++) {

          col.push(this.e(i,k));

        }

        return Vector.create(col);

      }

    };

    

    // Returns the number of rows/columns the matrix has

    this.dimensions = function() {

      return {rows: this.elements.length, cols: this.elements[0].length};

    };

    

    // Set the matrix's elements from an array. If the argument passed

    // is a vector, the resulting matrix will be a single column.

    this.setElements = function(els) {

      var row, i, j, success = true;

      this.elements = [];

      if (els.elements) { els = els.elements; }

      for (i = 0; i < els.length; i++) {

        if (els[i][0] !== undefined) {

          row = [];

          for (j = 0; j < els[i].length; j++) {

            if (!isNaN(els[i][j])) { row.push(els[i][j]); }

          }

          if (i > 0 && this.elements[i-1].length != row.length) {

            success = false;

          } else {

            this.elements.push(row);

          }

        } else {

          if (!isNaN(els[i])) { this.elements.push([els[i]]); }

        }

      }

      if (!success) { this.elements = []; }

    };

    

    // Construct the matrix

    this.setElements(els);

    

    // Returns true iff the matrix is equal to the argument. You can supply

    // a vector as the argument, in which case the receiver must be a

    // one-column matrix equal to the vector.

    this.eql = function(matrix) {

      matrix = Matrix.create(matrix);

      return (this.inspect() == matrix.inspect());

    };

    

    // Returns a copy of the matrix

    this.dup = function() {

      return Matrix.create(this.elements);

    };

    

    // Returns true iff the argument has the same dimensions as the matrix

    this.isSameSizeAs = function(matrix) {

      matrix = Matrix.create(matrix);

      return (this.dimensions().rows == matrix.dimensions().rows &&

          this.dimensions().cols == matrix.dimensions().cols);

    };

    

    // Returns the result of adding the argument to the matrix

    this.add = function(matrix) {

      matrix = Matrix.create(matrix);

      if (!this.isSameSizeAs(matrix)) {

        return null;

      } else {

        var new_els = [], i, j;

        for (i = 1; i <= this.dimensions().rows; i++) {

          new_els[i - 1] = [];

          for (j = 1; j <= this.dimensions().cols; j++) {

            new_els[i - 1].push(this.e(i,j) + matrix.e(i,j));

          }

        }

        return Matrix.create(new_els);

      }

    };

    

    // Returns the result of subtracting the argument from the matrix

    this.subtract = function(matrix) {

      return this.add(matrix.x(-1));

    };

    

    // Returns true iff the matrix can multiply the argument from the left

    this.canMultiplyFromLeft = function(matrix) {

      var mat = Matrix.create(matrix);

      return (this.dimensions().cols == mat.dimensions().rows);

    };

    

    // Returns the result of multiplying the matrix from the right by the argument.

    // If the argument is a scalar then just multiply all the elements.

    this.multiply = function(matrix) {

      var i, j;

      if (matrix.elements) {

        matrix = Matrix.create(matrix);

        if (!this.canMultiplyFromLeft(matrix)) {

          return null;

        } else {

          var new_els = [], A, B;

          for (i = 0; i < this.dimensions().rows; i++) {

            A = this.row(i+1);

            new_els[i] = [];

            for (j = 0; j < matrix.dimensions().cols; j++) {

              B = matrix.col(j+1);

              new_els[i][j] = A.dot(B);

            }

          }

          return Matrix.create(new_els);

        }

      } else {

        var M = this.dup();

        for (i = 0; i < this.dimensions().rows; i++) {

          for (j = 0; j < this.dimensions().cols; j++) {

            M.elements[i][j] = M.e(i+1,j+1) * matrix;

          }

        }

        return M;

      }

    };

    

    this.x = function(matrix) { return this.multiply(matrix); };

    

    // Returns a submatrix taken from the matrix

    // Argument order is: start row, start col, nrows, ncols

    this.minor = function(a, b, c, d) {

      if (a < 1 || b < 1 || a + c - 1 > this.dimensions().rows || b + d - 1 > this.dimensions().cols) {

        return null;

      } else {

        var i, j, new_els = [];

        for (i = a; i <= a + c - 1; i++) {

          new_els[i - a] = [];

          for (j = b; j <= b + d - 1; j++) {

            new_els[i - a][j - b] = this.e(i,j);

          }

        }

        return Matrix.create(new_els);

      }

    };

    

    // Returns true iff the matrix is square

    this.isSquare = function() {

      var d = this.dimensions();

      return (d.rows == d.cols);

    };

    

    // Returns the (absolute) largest element of the matrix

    this.max = function() {

      var m = 0;

      for (var i = 1; i <= this.dimensions().rows; i++) {

        if (Math.abs(this.row(i).max()) > Math.abs(m)) { m = this.row(i).max(); }

      }

      return m;

    };

    

    // Returns the indeces of the first match found by reading row-by-row from left to right

    this.indexOf = function(x) {

      var index = null, i, j;

      for (i = 1; i <= this.dimensions().rows; i++) {

        for (j = 1; j <= this.dimensions().cols; j++) {

          if (index === null && this.e(i,j) == x) {

            index = {i: i, j: j};

          }

        }

      }

      return index;

    };

    

    // If the matrix is square, returns the diagonal elements as a vector.

    // Otherwise, returns null.

    this.diagonal = function() {

      if (!this.isSquare) {

        return null;

      } else {

        var els = [];

        for (var i = 1; i <= this.dimensions().rows; i++) {

          els.push(this.e(i,i));

        }

        return Vector.create(els);

      }

    };

    

    // Diagonalize the matrix by Gaussian elimination. This method only

    // adds multiples of rows to other rows. No rows are scaled up or

    // switched, and the determinant is preserved.

    this.diagonalize = function() {

      var i, j;

      for (i = 1; i < this.dimensions().rows; i++) {

        if (this.e(i,i) != 0) {

          for (j = i + 1; j <= this.dimensions().rows; j++) {

            this.elements[j - 1] = this.row(j).subtract(this.row(i).x(this.e(j,i) / this.e(i,i))).elements;

          }

        }

      }

      return this;

    };

    

    // Returns the result of diagonalizing the matrix

    this.toDiagonalMatrix = function() {

      return this.dup().diagonalize();

    };

    

    // Returns the determinant for square matrices

    this.determinant = function() {

      if (!this.isSquare()) {

        return null;

      } else {

        var els = this.toDiagonalMatrix().diagonal().elements;

        var det = els[0];

        for (var i = 1; i < els.length; i++) { det = det * els[i]; }

        return det;

      }

    };

    

    this.det = function() { return this.determinant(); };

    

    // Returns true iff the matrix is singular

    this.isSingular = function() {

      return (this.isSquare() && this.determinant() === 0);

    };

    

    // Returns the trace for square matrices

    this.trace = function() {

      if (!this.isSquare()) {

        return null;

      } else {

        var els = this.toDiagonalMatrix().diagonal().elements;

        var tr = els[0];

        for (var i = 1; i < els.length; i++) { tr = tr + els[i]; }

        return tr;

      }

    };

    

    this.tr = function() { return this.trace(); };

    

    // Returns the result of attaching the given argument to the right-hand side of the matrix

    this.augment = function(matrix) {

      matrix = Matrix.create(matrix); // Allows us to supply vectors

      var self = this.dup();

      var i, j;

      if (self.dimensions().rows == matrix.dimensions().rows) {

        for (i = 0; i < self.dimensions().rows; i++) {

          for (j = 0; j < matrix.dimensions().cols; j++) {

            self.elements[i][self.dimensions().rows + j] = matrix.e(i+1,j+1);

          }

        }

        return self;

      } else {

        return null;

      }

    };

    

    // Returns the inverse (if one exists) using Gauss-Jordan

    this.inverse = function() {

      var i, j;

      if (this.isSquare() && !this.isSingular()) {

        var n = this.dimensions().rows;

        var M = this.augment(Matrix.I(n));

        M.diagonalize(); // Matrix is non-singular so there will be no zeros on the diagonal

        for (i = 1; i <= n; i++) {

          M.elements[i - 1] = M.row(i).x(1 / M.e(i,i)).elements;

        }

        for (i = n; i > 1; i--) {

          for (j = 1; j < i; j++) {

            M.elements[j - 1] = M.row(j).subtract(M.row(i).x(M.e(j,i))).elements;

          }

        }

        return M.minor(1, n+1, n, n);

      } else {

        return null;

      }

    };

    

    this.inv = function() { return this.inverse(); };

    

    // Returns the result of rounding all the elements

    this.round = function() {

      var new_els = [], i, j;

      for (i = 1; i < this.dimensions().rows; i++) {

        new_els[i - 1] = [];

        for (j = 1; j < this.dimensions().cols; j++) {

          new_els[i - 1].push(Math.round(this.e(i,j)));

        }

      }

      return Matrix.create(new_els);

    };

    

    // Returns a string representation of the matrix

    this.inspect = function() {

      var matrix = this.dup();

      for (var i = 0; i < matrix.dimensions().rows; i++) {

        matrix.elements[i] = Vector.create(matrix.elements[i]).inspect();

      }

      return matrix.elements.join('\n');

    };

  }