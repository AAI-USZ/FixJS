function showSummary() {
        var status;
        log(EMPTY);
        log(OUTPUT_SEPARATOR);
        switch (true) {
            case !!overallFatal:
                status = "error";
                log(ERROR + "   " + overallFatal + " Errors");
            case !!overallFail:
                status = "fail";
                log(FAILURE + EMPTY + overallFail + " Failures");
            default:
                status = "pass";
                log(OK + "      " + overallPass + " Passes");
        }
        wru.status = status;
        log(OUTPUT_SEPARATOR);
        log(EMPTY);
        wru.after();
        try {
            // node.js
            process.exit();
        } catch(up) {
            // rhino
            quit();
        }
    }