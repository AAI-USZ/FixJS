function _onRemoteGoto(res) {
        // res = {nodeId, name, value}
        var location, url = res.value;
        var matches = /^(.*):([^:]+)$/.exec(url);
        if (matches) {
            url = matches[1];
            location = matches[2].split(',');
            if (location.length === 1) {
                location = parseInt(location[0], 10);
            } else {
                location = { line: parseInt(location[0], 10), ch: parseInt(location[1], 10) };
            }
        }
        open(url, location);
    }