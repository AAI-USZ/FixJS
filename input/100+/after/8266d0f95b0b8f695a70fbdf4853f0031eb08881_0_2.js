function mouseOver(d) {

    svg.selectAll("path").classed("non-selected", true);
    
    svg.select("#text-" + d.key).classed("target", true);
    
    svg.selectAll("path.link.target-" + d.key)
        .classed("target", true)
        .classed("hidden", false)
        .each(highlightAll("source", true));

    svg.selectAll("path.link.source-" + d.key)
        .classed("source", true)
        .classed("hidden", false)
        .each(highlightAll("target", true));

}