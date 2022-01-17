function Vector(name, elements) {
    'use strict';

    this.name = name;
    if (arguments.length === 1) {
        this.elts = [];
        this.elts[0] = 0;
        this.dim = 1;
    }
    if (arguments.length === 2) {
        this.elts = elements;
        this.dim = elements.length;
    }

    //pass an Array or a single number as <value> to the Vector; single numbers get 
    //assigned at <position> in the vector.
    this.setVal = function (value, position) {
        if (arguments.length === 1) {
            this.elts = value;
            this.dim = value.length;
            return;
        }
        if (arguments.length === 2) {
            this.elts[position] = value;
            if (this.dim < (position + 1)) {
                this.dim = position + 1;
            }
            return 0;
        }
    };


    //take the dot product of this Vector with Vector <vec>.  Optional Matrix <metric>
    //will be used as a meric (default rectangular Cartesian)
    this.dot = function (vec, metric) {
        var dim, left, sum;

        if (!(vec instanceof Vector)) {
            alert('Must take dot product with another Vector.    Aborting...');
            return -999;
        }
        if (this.dim !==  vec.dim) {
            alert('Vectors must be the same length to take dot product.    Aborting...');
            return -999;
        }

        sum = 0;

        if (arguments.length === 1) {
            for (dim = 0; dim < this.dim; dim++) {
                sum  += this.elts[dim] * vec.elts[dim];
            }
            return sum;
        }

        if (arguments.length === 2) {
            if ((this.dim !==  metric.rows) || (vec.dim !==  metric.cols)) {
                alert('Incorrect metric dimension.    Aborting...');
                return -999;
            }
            left = metric.mtxMulti(this, 'left');
            for (dim = 0; dim < left.dim; dim++) {
                sum  += left.elts[dim] * vec.elts[dim];
            }
            return sum;
        }
    };


    //Returns the length of this Vector.  Matrix <metric> optional, default rectangular Cartesian.
    this.getLength = function (metric) {
        var length;

        length = 0;

        if (arguments.length === 0) {
            length = Math.pow(this.dot(this), 0.5);
        }

        if (arguments.length === 1) {
            length = Math.pow((metric.mtxMulti(this, 'left')).dot(this), 0.5);
        }

        return length;
    };

}