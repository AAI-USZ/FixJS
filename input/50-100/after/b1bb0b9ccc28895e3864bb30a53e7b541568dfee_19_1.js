function(shouldHighlight) {
        if (this.$highlightGutterLine == shouldHighlight)
            return;
        this.$highlightGutterLine = shouldHighlight;

        this.$loop.schedule(this.CHANGE_GUTTER);
    }