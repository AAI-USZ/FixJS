function(validityReport) {
        console.log("The storyboard is not valid");
        console.log(validityReport);
        console.log(JSON.stringify(validityReport));
        var message = "The storyboard is not valid<br><br>";

        if (validityReport.cycles) {
            message += "There are cycles in the graph<br><br>";
        }
        if (validityReport.reachability) {
            message += "There are no paths from the source to the sink<br><br>";
        }
        if (validityReport.degrees.outgoing) {
            message += "There are one or more Events with no outgoing segments<br><br>";
        }
        if (validityReport.degrees.incoming) {
            message += "There are one or more Events with no incoming segments<br><br>";
        }
        error(message);
    }