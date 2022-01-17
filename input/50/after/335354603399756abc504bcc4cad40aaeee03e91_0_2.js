function() {
        // Is the question for FF on mobile?
        return document.location.pathname.indexOf('mobile') >= 0;
    }