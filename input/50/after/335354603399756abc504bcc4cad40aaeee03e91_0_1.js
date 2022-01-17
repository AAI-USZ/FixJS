function() {
        // Is the question for FF on the desktop?
        return document.location.pathname.indexOf('desktop') >= 0;
    }