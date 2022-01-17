function() {
        // Is the question for FF on mobile?
        return document.location.search.indexOf('product=mobile') >= 0;
    }