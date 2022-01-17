function (fac) {
        var factor, i, total;

        factor = typeof fac !== 'undefined' ? fac : 1;

        total = this.integrate();

        for (i = 0; i < this.bins.length; i++) {
            this.bins[i].weight = factor * this.bins[i].weight / total;
        }

        return 0;
    }