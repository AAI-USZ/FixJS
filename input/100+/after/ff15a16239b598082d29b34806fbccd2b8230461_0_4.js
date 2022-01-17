function (x, dim, tol, roundoff) {
        var D, dimension, doRound, dtol, dtol2, tolerance, vary, Xhi, Xhi2, Xlo, Xlo2;

        dimension = typeof dim !== 'undefined' ? dim : 0;
        tolerance = typeof tol !== 'undefined' ? tol : 0.000001;
        doRound = typeof roundoff !== 'undefined' ? roundoff : 1;

        if (!(x instanceof Array)) {
            dtol = (this.evaluate(x + tolerance) - this.evaluate(x - tolerance)) / (2 * tolerance);
            dtol2 = (this.evaluate(x + tolerance / 2) - this.evaluate(x - tolerance / 2)) / tolerance;
        } else {
            Xhi = [];
            Xlo = [];
            Xhi2 = [];
            Xlo2 = [];

            for (vary = 0; vary < x.length; vary++) {
                Xhi[vary] = x[vary];
                Xlo[vary] = x[vary];
                Xhi2[vary] = x[vary];
                Xlo2[vary] = x[vary];
            }
            Xhi[dimension]  += tolerance;
            Xlo[dimension]  -=  tolerance;
            Xhi2[dimension]  += tolerance / 2;
            Xlo2[dimension]  -=  tolerance / 2;

            dtol = (this.evaluate(Xhi) - this.evaluate(Xlo)) / (2 * tolerance);
            dtol2 = (this.evaluate(Xhi2) - this.evaluate(Xlo2)) / tolerance;
        }

        D = (4 * dtol2 - dtol) / 3;

        if (doRound  ===  0) {
            return D;
        }
        if (doRound  ===  1) {
            return Math.round(D / tolerance) * tolerance;
        }
    }