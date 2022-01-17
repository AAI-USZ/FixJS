function asIcon(result) {
        var icon = document.createElement('img'),
            name = result.color;
        if (name === 'aborted' || name === 'disabled') {
            name = 'grey';
        }
        else if (name === 'aborted_anime' || name === 'disabled_anime') {
            name = 'grey_anime';
        }
        icon.src = name + ".gif";
        return icon;
    }