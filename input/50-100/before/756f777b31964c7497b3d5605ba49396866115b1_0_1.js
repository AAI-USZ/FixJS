function (text, matchString) {
        if (!matchString) return text;

        var regex = new RegExp('(' + matchString + ')', 'gi');
        return text.replace(regex, '<span class="searchHighlighted">$1</span>');
    }