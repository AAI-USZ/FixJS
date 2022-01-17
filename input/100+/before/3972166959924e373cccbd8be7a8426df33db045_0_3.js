function() {
        this.numberOfRows = this.contentLength();

        var oldViewportHasVScroll = this.viewportHasVScroll;
        // with autoHeight, we do not need to accommodate the vertical scroll bar
        this.viewportHasVScroll = this.numberOfRows * this.rowHeight > this.viewportH;

        var oldH = this.h;
        this.th = this.rowHeight * this.numberOfRows;
        if (this.th < this.maxSupportedCssHeight) {
            // just one page
            this.h = this.th;
        } else {
            Ember.log("SlickGrid does'nt support more than " + maxSupportedCssHeight + " of height");
        }

        if (this.h !== this.oldH) {
            this.$().css("height", this.h);
            this.scrollTop = $(window).scrollTop() - this.$().offset().top;
            this.scrollTop = (this.scrollTop < 0) ? 0 : this.scrollTop;
        }

        var oldScrollTopInRange = (this.scrollTop <= this.th - this.viewportH);

        if (this.th == 0 || this.scrollTop == 0) {
        } else if (this.oldScrollTopInRange) {
            // maintain virtual position
            this.scrollTo(this.scrollTop);
        } else {
            // scroll to bottom
            this.scrollTo(this.th - this.viewportH);
        }
        this.updateCanvasWidth();
    }