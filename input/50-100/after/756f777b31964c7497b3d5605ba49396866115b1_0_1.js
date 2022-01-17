function (text, matchString) {
        if (!_.isString(matchString)) return text;

        matchString = matchString
            .replace(/^(\*|\?)*|(\*|\?)*$/g, '')
            .replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")
            .replace(/\\\*/g, ".*")
            .replace(/\\\?/g, ".");
            
        if (!matchString) return text;

        var regex = new RegExp('(' + matchString + ')', 'gi');
        return text.replace(regex, '<span class="searchHighlighted">$1</span>');
    }