function(slices, arc) {
        slices.append("text")
            .attr("transform", function(d) {
                d.innerRadius = chart.innerRadius();
                d.outerRadius = radius;
                var centroid = arc.centroid(d);
                if (isNaN(centroid[0]) || isNaN(centroid[1])) {
                    return "translate(0,0)";
                } else {
                    return "translate(" + centroid + ")";
                }
            })
            .attr("text-anchor", "middle")
            .text(function(d) {
                var data = d.data;
                if (data.value == 0)
                    return "";
                return data.key;
            });
    }