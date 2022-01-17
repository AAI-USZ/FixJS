function updateGraph(report, newSeries) {
    // Rickshaw extends the prototype of the series array. Copy over the extension(s).
    newSeries.active = report.graph.series.active;

    // Update the graph with the new series
    report.graph.series = newSeries;
    try {
        report.graph.update();
    } catch(e) { // Something bad happened while trying to update the graph.
        // Draw a new graph
        drawGraph(report, newSeries);
        report.graphDecorator(report);
    }
}