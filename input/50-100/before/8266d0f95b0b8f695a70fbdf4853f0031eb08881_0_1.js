function mouseOut(d) {

    svg.selectAll("path").classed("non-selected", false);

    svg.selectAll("path.link.source-" + d.key)
        .classed("source", false)
        .each(highlightAll("target", false));

    svg.selectAll("path.link.target-" + d.key)
        .classed("target", false)
        .each(highlightAll("source", false));
}