function () {
        var size = this.getWinSize();

        size.width *= cc.CONTENT_SCALE_FACTOR();
        size.height *= cc.CONTENT_SCALE_FACTOR();

        return size;
    }