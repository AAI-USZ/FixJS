function(withOutBuffer) {
        if (!this.initialized) {
            return;
        }
        var renderedRange = this.getRenderedRange();

        // remove unused rows
        this.deRenderRows(withOutBuffer ? null : renderedRange);

        // add new rows
        this.renderRows(renderedRange);

        this.lastRenderedScrollTop = this.scrollTop;
    }