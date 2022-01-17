function() {
        var range = this.httpRequest.headers["range"];
        if (!range)
            return null;

        // Matching "Range: bytes=1234-5678: both numbers are optional
        var matches = range.match(/^bytes=([0-9]*)-([0-9]*)$/i);
        if (!matches || !matches.length)
            return null;

        if (matches[1] === "" && matches[2] === "")
            return null;

        return [
            matches[1] ? matches[1] : null,
            matches[2] ? matches[2] : null
        ];
    }