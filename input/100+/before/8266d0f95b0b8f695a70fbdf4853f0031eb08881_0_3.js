function nodeClick(d) {
    d3.event.preventDefault();
    if (selected_source !== undefined && selected_target !== undefined) {
        clearSelection();
    }
    if (d3.event.shiftKey === true) {
        if (selected_target !== undefined) {
            svg.select("#arc-" + selected_target.key).classed("selected-target", false);
        }
        selected_target = d;
        svg.select("#arc-" + d.key).classed("selected-target", true);
    } else {
        if (selected_source !== undefined) {
            svg.select("#arc-" + selected_source.key).classed("selected-source", false);
        }
        selected_source = d;
        svg.select("#arc-" + d.key).classed("selected-source", true);
    }
}