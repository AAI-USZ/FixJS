function clearButtonClick() {
    clearSelection();
    if (selected_source !== undefined) {
        svg.select("#arc-" + selected_source.key).classed("selected-source", false);
        svg.select("#text-" + selected_source.key).classed("selected-source", false);
    }
    if (selected_target !== undefined) {
        svg.select("#arc-" + selected_target.key).classed("selected-target", false);
        svg.select("#text-" + selected_target.key).classed("selected-target", false);
    }
}