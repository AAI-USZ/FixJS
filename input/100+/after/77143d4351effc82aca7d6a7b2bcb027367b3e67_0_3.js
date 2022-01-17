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