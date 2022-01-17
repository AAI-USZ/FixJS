function() {
        var availableWidth = this.viewportHasVScroll ? this.viewportW - this.scrollbarDimensions.width : this.viewportW;
        return availableWidth;
    }