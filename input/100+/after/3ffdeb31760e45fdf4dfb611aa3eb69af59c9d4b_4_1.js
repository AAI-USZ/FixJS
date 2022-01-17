function showSummary() {
        var
            node = wru.node.insertBefore(
                create("div"),
                wru.node.firstChild
            ),
            innerHTML,
            className,
            status
        ;
        if (overallFatal) {
            status = className = "error";
            innerHTML = "There Are Errors: " + overallFatal;
        } else if(overallFail) {
            status = className = "fail";
            innerHTML = overallFail + " Tests Failed";
        } else {
            status = className = "pass";
            innerHTML = "Passed " + overallPass + " Tests";
        }
        wru.status = status;
        node[INNERHTML] = "<strong>" + innerHTML + "</strong>";
        node.className = className;
    }