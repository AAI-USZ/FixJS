function(viewportTop) {
        var range = this.getVisibleRange(viewportTop);
        var buffer = Math.round(this.viewportH / this.rowHeight);
        var minBuffer = 3;

        if (this.viewportHasVScroll){
            console.log('viewportHasVScroll -> viewportHasVScroll');
            if (this.scrollDir == -1) {
                range.top -= buffer;
                range.bottom + buffer;
            } else if (this.scrollDir == 1) {
                range.top -= buffer;
                range.bottom += buffer;
            } else {
                range.top -= minBuffer;
                range.bottom += minBuffer;
            }
        }
        range.top = Math.max(0, range.top );
        range.bottom = Math.min(this.contentLength()-1, range.bottom);

        return range;
    }