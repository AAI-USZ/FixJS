function (message) { /* Script Update Script Load Check */
        if (message === "Script Check: OK") {
            sys.webCall(construction.source + "scripts.js", updatecheck(resp, false));
        }
    }