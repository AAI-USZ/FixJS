function(str) {
        return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(match, index) {
            return index === 0 ? match.toUpperCase() : ' ' + match.toLowerCase();
        }).replace('_', ' ');
    }