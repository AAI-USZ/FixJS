function(i,j) {

      if (i < 1 || i > this.rows() || j < 1 || j > this.cols()) {

        return null;

      } else {

        return this.elements[i - 1][j - 1];

      }

    }