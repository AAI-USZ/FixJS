function updateDisplayedSegments(report) {
    // Create a new series with just the selected segments
    var segments = getSelectedSegments(report);
    var newSeries = report.series.filter(function(segment) {
        return segments.indexOf(segment.name) !== -1;
    });

    // Rickshaw breaks on empty series, so give it a blank one instead.
    if(newSeries.length === 0) {
        return false;
    }

    // Temporarily overwrite full series with filtered series,
    // so that updateGraph can get at them.
    var allSeries = report.series;
    report.series = newSeries;

    updateGraph(report);

    // Restore full series
    report.series = allSeries;

    return true;
}