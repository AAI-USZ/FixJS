function (pos, start, end) {
        var startIndex = this.indexFromPos(start),
            endIndex = this.indexFromPos(end),
            posIndex = this.indexFromPos(pos);

        return posIndex >= startIndex && posIndex <= endIndex;
    }