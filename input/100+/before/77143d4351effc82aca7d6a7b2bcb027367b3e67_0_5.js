function (username, container) {
    var w = 960,
        h = 500,
        r = Math.min(w, h) / 2,
        defaultOuterRadius = r - 20,
        hoverOuterRadius = r,
        data = [],
        selectedArc,
        colour = d3.scale.category20b(),
        random = d3.random.normal(0, 1),
        pie = d3.layout.pie().sort(null).value(function (d) { return d.weight; }),
        arc = d3.svg.arc().innerRadius(r - 150).outerRadius(defaultOuterRadius),
        arcHover = d3.svg.arc().innerRadius(r - 150).outerRadius(hoverOuterRadius),
        svg = d3.select(container)
            .append("svg")
                .attr("width", w)
                .attr("height", h)
            .append("g")
                .attr("transform", "translate(" + w / 2 + "," + h / 2 + ")"),
        pieStats = svg.append("g").attr("class", "pie-stats"),
        pieStatsInterest = pieStats.append("text")
            .attr("class", "pie-stats-interest")
            .attr("text-anchor", "middle")
            .attr("dy", -10),
        pieStatsWeight = pieStats.append("text")
            .attr("class", "pie-stats-weight")
            .attr("text-anchor", "middle")
            .attr("dy", 10);

    function getData() {
        var i,
            len,
            name,
            interestArray = [],
            interest,
            interests = testData.object.interests;

        for (i = 0, len = interests.length; i < len; i++) {
            interest = interests[i];
            name = Beancounter.getNameFromResource(interest.resource);
            interestArray.push({
                'name': name,
                'weight': Math.abs((interest.weight * 10) + random())
            });
        }

        return interestArray;
    }

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

    function handleClickOnArc(d) {
        if (selectedArc !== undefined && selectedArc !== null) {
            selectedArc
                .classed("selected", false)
                .transition()
                .attr("d", arc)
                .each(function (d) {
                    this.outerRadius = defaultOuterRadius;
                    this.currentArc = d;
                });
        }

        selectedArc = d3.select(this);
        selectedArc.classed("selected", true)
            .transition()
            .attr("d", arcHover)
            .each(function (d) {
                this.outerRadius = hoverOuterRadius;
                this.currentArc = d;
            });

        pieStatsInterest.text(d.data.name);
        pieStatsWeight.text(d.value + "%");
    }

    function redraw() {
        var arcs, arcsEnter, arcsExit,
            currentWeight;

        // TODO: Replace this with real data from AJAX call.
        data = getData();
        arcs = svg.selectAll("g.arc")
            .data(pie(data), function (d) { return d.data.name; });

        arcsEnter = arcs.enter().append("g")
            .attr("class", "arc");

        arcsEnter.append("path")
            .attr("fill", function (d, i) { return colour(i); })
            .attr("d", arc)
            .on("click", handleClickOnArc)
            .each(function (d) { this.currentArc = d; });

        arcs.select("path").transition().duration(750).attrTween("d", arcTween);
        if (selectedArc !== undefined && selectedArc !== null) {
            selectedArc.each(function (d) { currentWeight = d.value; });
            pieStatsWeight.text(currentWeight + "%");
        }

        // TODO: Handle interests being removed.
    }

    function updatePieChart() {
        redraw();
        setTimeout(updatePieChart, 2000);
    }

    return {
        init: function () {
            updatePieChart();
        }
    };
}