function(els) {

  

    // Returns element (i,j) of the matrix

    this.e = function(i,j) {

      if (i < 1 || i > this.rows() || j < 1 || j > this.cols()) {

        return null;

      } else {

        return this.elements[i - 1][j - 1];

      }

    };

    

    // Returns row k of the matrix as a vector

    this.row = function(k) {

      if (k > this.rows()) {

        return null;

      } else {

        return Vector.create(this.elements[k - 1]);

      }

    };

    

    // Returns column k of the matrix as a vector

    this.col = function(k) {

      if (k > this.cols()) {

        return null;

      } else {

        var col = [];

        for (var i = 1; i <= this.rows(); i++) {

          col.push(this.e(i,k));

        }

        return Vector.create(col);

      }

    };

    

    // Returns the number of rows/columns the matrix has

    this.dimensions = function() {

      return {rows: this.rows(), cols: this.cols()};

    };

    

    // Returns the number of rows in the matrix

    this.rows = function() {

      return this.elements.length;

    };

    

    // Returns the number of columns in the matrix

    this.cols = function() {

      return this.elements[0].length;

    };

    

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

    

    // Maps the matrix to another matrix (of the same dimensions) according to the given function

    this.map = function(fn) {

      var els = [];

      for (var i = 1; i <= this.rows(); i++) {

        els.push(this.row(i).map(fn).elements);

      }

      return Matrix.create(els);

    };

    

    // Returns true iff the argument has the same dimensions as the matrix

    this.isSameSizeAs = function(matrix) {

      matrix = Matrix.create(matrix);

      return (this.rows() == matrix.rows() &&

          this.cols() == matrix.cols());

    };

    

    // Returns the result of adding the argument to the matrix

    this.add = function(matrix) {

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

    };

    

    // Returns the result of subtracting the argument from the matrix

    this.subtract = function(matrix) {

      return this.add(matrix.x(-1));

    };

    

    // Returns true iff the matrix can multiply the argument from the left

    this.canMultiplyFromLeft = function(matrix) {

      var mat = Matrix.create(matrix);

      return (this.cols() == mat.rows());

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

          for (i = 0; i < this.rows(); i++) {

            A = this.row(i+1);

            new_els[i] = [];

            for (j = 0; j < matrix.cols(); j++) {

              B = matrix.col(j+1);

              new_els[i][j] = A.dot(B);

            }

          }

          return Matrix.create(new_els);

        }

      } else {

        var M = this.dup();

        for (i = 0; i < this.rows(); i++) {

          for (j = 0; j < this.cols(); j++) {

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

      if (a < 1 || b < 1 || a + c - 1 > this.rows() || b + d - 1 > this.cols()) {

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

      return (this.rows() == this.cols());

    };

    

    // Returns the (absolute) largest element of the matrix

    this.max = function() {

      var m = 0;

      for (var i = 1; i <= this.rows(); i++) {

        if (Math.abs(this.row(i).max()) > Math.abs(m)) { m = this.row(i).max(); }

      }

      return m;

    };

    

    // Returns the indeces of the first match found by reading row-by-row from left to right

    this.indexOf = function(x) {

      var index = null, i, j;

      for (i = 1; i <= this.rows(); i++) {

        for (j = 1; j <= this.cols(); j++) {

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

        for (var i = 1; i <= this.rows(); i++) {

          els.push(this.e(i,i));

        }

        return Vector.create(els);

      }

    };

    

    // Make the matrix upper (right) triangular by Gaussian elimination.

    // This method only adds multiples of rows to other rows. No rows are

    // scaled up or switched, and the determinant is preserved. Elements that

    // are within rounding error precision of zero are snapped to zero.

    this.toRightTriangular = function() {

      var i, j, M = this.dup();

      for (i = 1; i < M.rows(); i++) {

        if (M.e(i,i) == 0) {

          for (j = i + 1; j <= M.rows(); j++) {

            if (M.e(j,i) != 0) {

              M.elements[i - 1] = M.row(i).add(M.row(j)).elements;

            }

          }

        }

        if (M.e(i,i) != 0) {

          for (j = i + 1; j <= M.rows(); j++) {

            M.elements[j - 1] = M.row(j).subtract(M.row(i).x(M.e(j,i) / M.e(i,i))).elements;

          }

        }

      }

      return M.snapTo(0);

    };

    

    this.toUpperTriangular = function() { return this.toRightTriangular(); };

    

    // Returns the determinant for square matrices

    this.determinant = function() {

      if (!this.isSquare()) {

        return null;

      } else {

        var els = this.toRightTriangular().diagonal().elements;

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

        var els = this.toRightTriangular().diagonal().elements;

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

      if (self.rows() == matrix.rows()) {

        for (i = 0; i < self.rows(); i++) {

          for (j = 0; j < matrix.cols(); j++) {

            self.elements[i][self.rows() + j] = matrix.e(i+1,j+1);

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

        var n = this.rows();

        var M = this.augment(Matrix.I(n)).toRightTriangular();

        // Matrix is non-singular so there will be no zeros on the diagonal

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

      for (i = 1; i <= this.rows(); i++) {

        new_els[i - 1] = [];

        for (j = 1; j <= this.cols(); j++) {

          new_els[i - 1].push(Math.round(this.e(i,j)));

        }

      }

      return Matrix.create(new_els);

    };

    

    // Sets the elements of the matrix to the given value if they

    // differ from it by less than jsMetric.precision

    this.snapTo = function(x) {

      for (var i = 1; i <= this.rows(); i++) {

        this.elements[i - 1] = this.row(i).snapTo(x).elements;

      }

      return this;

    };

    

    // Returns a string representation of the matrix

    this.inspect = function() {

      var matrix = this.dup();

      for (var i = 0; i < matrix.rows(); i++) {

        matrix.elements[i] = Vector.create(matrix.elements[i]).inspect();

      }

      return matrix.elements.join('\n');

    };

    

    // Set the matrix's elements from an array. If the argument passed

    // is a vector, the resulting matrix will be a single column.

    this.setElements = function(els) {

      var row, i, j, success = true;

      if (els == undefined) {

        return null;

      } else {

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

        if (!success) {

          this.elements = [];

          return null;

        } else {

          return this;

        }

      }

    };

  }