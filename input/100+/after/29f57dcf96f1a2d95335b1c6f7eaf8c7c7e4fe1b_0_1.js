function() {
        drawGraph(report, report.series);

        // Format graph with proper axes and hover details
        initStepGraph(report);

        // Put the controls and graph in a consistent state
        cumulativeToggled(report);
    }