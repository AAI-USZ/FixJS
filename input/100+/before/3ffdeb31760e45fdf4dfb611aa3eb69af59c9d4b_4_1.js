function showSummary() {
        var
            node = wru.node.insertBefore(
                create("div"),
                wru.node.firstChild
            ),
            innerHTML,
            className
        ;
        if (overallFatal) {
            className = "error";
            innerHTML = "There Are Errors: " + overallFatal;
        } else if(overallFail) {
            className = "fail";
            innerHTML = overallFail + " Tests Failed";
        } else {
            className = "pass";
            innerHTML = "Passed " + overallPass + " Tests";
        }
        node[INNERHTML] = "<strong>" + innerHTML + "</strong>";
        node.className = className;
    }