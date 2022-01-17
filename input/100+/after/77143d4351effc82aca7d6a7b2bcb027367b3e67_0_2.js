function arcTween(a) {
        var currentArc = this.currentArc || {},
            startAngle = currentArc.startAngle || a.startAngle,
            endAngle = currentArc.endAngle || a.startAngle,
            i = d3.interpolate({startAngle: startAngle, endAngle: endAngle}, a),
            arcUpdate = d3.svg.arc()
                            .innerRadius(innerRadius)
                            .outerRadius(this.outerRadius || defaultOuterRadius);

        this.currentArc = i(0);

        return function (t) {
            return arcUpdate(i(t));
        };
    }