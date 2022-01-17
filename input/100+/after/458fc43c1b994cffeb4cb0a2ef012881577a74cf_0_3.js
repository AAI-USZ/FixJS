function linkMouseOver(d) {
    svg.select("path.link.source-" + d.source.key + ".target-" + d.target.key)
       .classed("selected", true);
    svg.select("#arc-" + d.target.key).classed("target", true);
    svg.select("#arc-" + d.source.key).classed("source", true);
    svg.select("#text-" + d.target.key).classed("target", true);
    svg.select("#text-" + d.source.key).classed("target", true);
}