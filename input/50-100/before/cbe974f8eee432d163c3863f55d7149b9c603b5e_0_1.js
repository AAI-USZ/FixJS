function asIcon(result) {
        var icon = document.createElement('img'),
            name = result.color;
        if (name === 'aborted' || name === 'disabled') {
            name = 'grey';
        }
        icon.src = name + ".gif";
        return icon;
    }