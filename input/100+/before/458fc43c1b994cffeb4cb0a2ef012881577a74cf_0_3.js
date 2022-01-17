function linkMouseOut(d) {
    svg.select("path.link.source-" + d.source.key + ".target-" + d.target.key)
       .classed("selected", false);
    svg.select("#arc-" + d.target.key).classed("selected-target", false);
    svg.select("#text-" + d.target.key).classed("selected-target", false);
    svg.select("#arc-" + d.source.key).classed("selected-source", false);
    svg.select("#text-" + d.source.key).classed("selected-source", false);   
}