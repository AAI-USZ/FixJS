function (min, max, tol) {
        var a, b, c, f_a, f_b, f_c, gridMin, gridS, gridSteps, here, high, low, lowestPoint, stepSize, tolerance;

        // grid search to find some zero, very slow
        gridSteps = 1000;
        stepSize = (max - min) / gridSteps;
        here = min;
        gridMin = Math.abs(this.evaluate(min));
        lowestPoint = here;
        for (gridS = 0; gridS < gridSteps; gridS++) {
            if (Math.abs(this.evaluate(here))  <  gridMin) {
                lowestPoint = here;
                gridMin = Math.abs(this.evaluate(here));
            }
            here  += stepSize;
        }

        low = lowestPoint - stepSize;
        high = lowestPoint  +  stepSize;

        tolerance = typeof tol !== 'undefined' ? tol : 0.000001;

        a = low;
        b = high;
        f_a = Math.abs(this.evaluate(a));
        f_b = Math.abs(this.evaluate(b));
        c = (a + b) / 2;
        f_c = Math.abs(this.evaluate(c));

        while (Math.abs(a - b)  >  tolerance) {
            if (f_a  >  f_b && f_a  >  f_c) {
                a = c;
                f_a = Math.abs(this.evaluate(a));
            } else if (f_b  >  f_a && f_b  >  f_c) {
                b = c;
                f_b = Math.abs(this.evaluate(b));
            }
            c = (a + b) / 2;
            f_c = Math.abs(this.evaluate(c));
        }

        return Math.round(c / tolerance) * tolerance;
    }