function (coords, start, end) {
        var startIndex = this.indexFromPos(start),
            endIndex = this.indexFromPos(end),
            coordIndex = this.indexFromPos(coords);

        return coordIndex >= startIndex && coordIndex <= endIndex;
    }