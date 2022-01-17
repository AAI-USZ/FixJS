function () {
        var borderThickness = (this.$htmlContent.outerHeight() - this.$htmlContent.innerHeight()) / 2;
        this.$relatedContainer.css("top", this.$htmlContent.offset().top + borderThickness);
        this.$relatedContainer.height(this.$htmlContent.height());
        
        // Because we're using position: fixed, we need to explicitly clip the range list if it crosses
        // out of the top or bottom of the scroller area.
        var hostScroller = this.hostEditor.getScrollerElement(),
            rcTop = this.$relatedContainer.offset().top,
            rcHeight = this.$relatedContainer.outerHeight(),
            rcBottom = rcTop + rcHeight,
            scrollerOffset = $(hostScroller).offset(),
            scrollerTop = scrollerOffset.top,
            scrollerBottom = scrollerTop + hostScroller.clientHeight,
            scrollerLeft = scrollerOffset.left,
            rightOffset = $(window.document.body).outerWidth() - (scrollerLeft + hostScroller.clientWidth);
        if (rcTop < scrollerTop || rcBottom > scrollerBottom) {
            this.$relatedContainer.css("clip", "rect(" + Math.max(scrollerTop - rcTop, 0) + "px, auto, " +
                                       (rcHeight - Math.max(rcBottom - scrollerBottom, 0)) + "px, auto)");
        } else {
            this.$relatedContainer.css("clip", "");
        }
        
        // Constrain relatedContainer width to half of the scroller width
        var relatedContainerWidth = this.$relatedContainer.width();
        if (this._relatedContainerInserted) {
            if (this._relatedContainerDefaultWidth === undefined) {
                this._relatedContainerDefaultWidth = relatedContainerWidth;
            }
            
            var halfWidth = Math.floor(hostScroller.clientWidth / 2);
            relatedContainerWidth = Math.min(this._relatedContainerDefaultWidth, halfWidth);
            this.$relatedContainer.width(relatedContainerWidth);
        }
        
        // Position immediately to the left of the main editor's scrollbar.
        this.$relatedContainer.css("right", rightOffset + "px");

        // Add extra padding to the right edge of the widget to account for the range list.
        this.$htmlContent.css("padding-right", this.$relatedContainer.outerWidth() + "px");
        
        // Set the minimum width of the widget (which doesn't include the padding) to the width
        // of CodeMirror's linespace, so that the total width will be at least as large as the
        // width of the host editor's code plus the padding for the range list. We need to do this
        // rather than just setting min-width to 100% because adding padding for the range list
        // actually pushes out the width of the container, so we would end up continuously
        // growing the overall width.
        // This is a bit of a hack since it relies on knowing some detail about the innards of CodeMirror.
        var lineSpace = this.hostEditor._getLineSpaceElement(),
            minWidth = $(lineSpace).offset().left - this.$htmlContent.offset().left + lineSpace.scrollWidth;
        this.$htmlContent.css("min-width", minWidth + "px");
    }