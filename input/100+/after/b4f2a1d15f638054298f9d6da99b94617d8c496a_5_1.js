function (fwd) {
        if (!fwd.from.match(/^[0-9]+\.[0-9]+\.[0-9]+\.[0-9]+:[0-9]+$/)) {
            throw new Error('Malformed forward "from: ' + fwd.from + '"');
        }
        if (!fwd.to.match(/^[0-9]+\.[0-9]+\.[0-9]+\.[0-9]+:[0-9]+$/)) {
            throw new Error('Malformed forward "to: ' + fwd.from + '"');
        }
    }