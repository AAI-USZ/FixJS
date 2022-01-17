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