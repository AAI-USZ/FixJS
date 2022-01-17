function (username, container) {
    var w = 960,
        h = 500,
        r = Math.min(w, h) / 2,
        defaultOuterRadius = r - 20,
        hoverOuterRadius = r,
        innerRadius = r - 150,
        data = [],
        selectedArc,
        colour = d3.scale.category20b(),
        random = d3.random.normal(0, 1),
        pie = d3.layout.pie().value(function (d) { return d.weight; }),
        arc = d3.svg.arc().innerRadius(innerRadius).outerRadius(defaultOuterRadius),
        arcHover = d3.svg.arc().innerRadius(innerRadius).outerRadius(hoverOuterRadius),
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
            .attr("dy", -5),
        pieStatsWeight = pieStats.append("text")
            .attr("class", "pie-stats-weight")
            .attr("text-anchor", "middle")
            .attr("dy", 15);

    function getData(profile) {
        var i,
            len,
            name,
            interestArray = [],
            interest,
            interests = profile.object.interests;

        for (i = 0, len = interests.length; i < len; i++) {
            interest = interests[i];
            name = Beancounter.getNameFromResource(interest.resource);
            interestArray.push({
                'name': name,
                'weight': interest.weight * 100
            });
        }

        return interestArray;
    }

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

    function removeArcTween(a) {
        var i = d3.interpolate(a, {startAngle: a.endAngle, endAngle: a.endAngle}),
            arcUpdate = d3.svg.arc()
                            .innerRadius(innerRadius)
                            .outerRadius(this.outerRadius || defaultOuterRadius);

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

        pieStatsInterest
            .text(d.data.name)
            .style("font-size", "24px")
            .style("font-size", function () {
                return (2 * innerRadius - 24) / this.getComputedTextLength() * 24 + "px";
            });
        pieStatsWeight.text(d.value + "%");
    }

    function updatePieStats() {
        if (selectedArc !== undefined && selectedArc !== null) {
            if ($("g.arc path.selected").length === 0) {
                // This is no longer one of the top interests in the user
                // profile.
                selectedArc = undefined;
                pieStatsInterest.text("");
                pieStatsWeight.text("");
            } else {
                selectedArc.each(function (d) {
                    pieStatsWeight.text(d.value + "%");
                });
            }
        }
    }

    function redraw(profile) {
        var arcs, arcsEnter, arcsExit;

        data = getData(profile);
        arcs = svg.selectAll("g.arc")
            .data(pie(data), function (d) { return d.data.name; });

        arcsEnter = arcs.enter().append("g")
            .attr("class", "arc");

        arcsEnter.append("path")
            .attr("fill", function (d, i) { return colour(i); })
            .on("click", handleClickOnArc)
            .transition()
                .duration(750)
                .attrTween("d", arcTween);

        arcs.select("path").transition()
            .duration(750)
            .attrTween("d", arcTween);

        arcsExit = arcs.exit();

        arcsExit.select("path")
            .transition()
                .duration(750)
                .attrTween("d", removeArcTween);

        arcsExit.transition()
            .delay(750)
            .remove()
            .each("end", updatePieStats);
    }

    function updatePieChart() {
        $.ajax({
            url: 'http://46.4.89.183/sally/profile-proxy.php',
            data: {
                'username': username
            },
            dataType: 'json',
            cache: false,
            success: function (data) {
                redraw($.parseJSON(data));
                setTimeout(updatePieChart, 5000);
            },
            error: function (request, errorText, data) {
                var obj = $.parseJSON(request.responseText),
                    error = obj.message;
                $("#errorContainer").html('<p>' + error + '</p>');
            }
        });
    }

    return {
        init: function () {
            updatePieChart();
        }
    };
}