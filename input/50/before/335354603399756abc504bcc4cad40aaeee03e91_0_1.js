function() {
        // Is the question for FF on the desktop?
        return document.location.search.indexOf('product=beta') >= 0 ||
               document.location.search.indexOf('product=desktop') >= 0;
    }