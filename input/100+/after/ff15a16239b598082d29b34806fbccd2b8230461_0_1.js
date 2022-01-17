function (min, max, tol) {
        var concavity, ddx, extrema, funcString, results, tolerance;

        tolerance = typeof tol !== 'undefined' ? tol : 0.000001;

        funcString = this.name + '.derivative(x[0], 0, 0.000001, 0)';

        ddx = new Func('ddx', funcString);
        extrema = ddx.brentSoln(min, max, tolerance);
        concavity = ddx.derivative(extrema);

        results = [];
        results[0] = Math.round(extrema / tolerance) * tolerance;
        if (concavity > 0) {
            results[1] = 0;
        }
        if (concavity < 0) {
            results[1] = 1;
        }

        return results;
    }