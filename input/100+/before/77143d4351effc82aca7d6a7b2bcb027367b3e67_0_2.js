function arcTween(a) {
        var i = d3.interpolate(this.currentArc, a),
            arcUpdate = d3.svg.arc().innerRadius(r - 150);
        this.currentArc = i(0);
        arcUpdate.outerRadius(this.outerRadius === undefined
            ? defaultOuterRadius
            : this.outerRadius);

        return function (t) {
            return arcUpdate(i(t));
        };
    }