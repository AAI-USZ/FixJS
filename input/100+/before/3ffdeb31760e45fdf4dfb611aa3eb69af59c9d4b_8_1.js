function showSummary() {
        log(EMPTY);
        log(OUTPUT_SEPARATOR);
        switch (true) {
            case !!overallFatal:
                log(ERROR + "   " + overallFatal + " Errors");
            case !!overallFail:
                log(FAILURE + EMPTY + overallFail + " Failures");
            default:
                log(OK + "      " + overallPass + " Passes");
        }
        log(OUTPUT_SEPARATOR);
        log(EMPTY);
        try {
            // node.js
            process.exit();
        } catch(up) {
            // rhino
            quit();
        }
    }