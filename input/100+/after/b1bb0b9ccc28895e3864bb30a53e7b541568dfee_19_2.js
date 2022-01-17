function(changes) {
        if (!changes || !this.session || !this.container.offsetWidth)
            return;

        // text, scrolling and resize changes can cause the view port size to change
        if (changes & this.CHANGE_FULL ||
            changes & this.CHANGE_SIZE ||
            changes & this.CHANGE_TEXT ||
            changes & this.CHANGE_LINES ||
            changes & this.CHANGE_SCROLL
        )
            this.$computeLayerConfig();

        // horizontal scrolling
        if (changes & this.CHANGE_H_SCROLL) {
            this.scroller.scrollLeft = this.scrollLeft;

            // read the value after writing it since the value might get clipped
            var scrollLeft = this.scroller.scrollLeft;
            this.scrollLeft = scrollLeft;
            this.session.setScrollLeft(scrollLeft);

            this.scroller.className = this.scrollLeft == 0 ? "ace_scroller" : "ace_scroller horscroll";
        }

        // full
        if (changes & this.CHANGE_FULL) {
            this.$textLayer.checkForSizeChanges();
            // update scrollbar first to not lose scroll position when gutter calls resize
            this.$updateScrollBar();
            this.$textLayer.update(this.layerConfig);
            if (this.showGutter) {
                if (this.$highlightGutterLine)
                    this.$updateGutterLineHighlight(true);
                this.$gutterLayer.update(this.layerConfig);
            }
            this.$markerBack.update(this.layerConfig);
            this.$markerFront.update(this.layerConfig);
            this.$cursorLayer.update(this.layerConfig);
            this.$moveTextAreaToCursor();
            return;
        }

        // scrolling
        if (changes & this.CHANGE_SCROLL) {
            this.$updateScrollBar();
            if (changes & this.CHANGE_TEXT || changes & this.CHANGE_LINES)
                this.$textLayer.update(this.layerConfig);
            else
                this.$textLayer.scrollLines(this.layerConfig);

            if (this.showGutter) {
                if (this.$highlightGutterLine)
                    this.$updateGutterLineHighlight(true);
                this.$gutterLayer.update(this.layerConfig);
            }
            this.$markerBack.update(this.layerConfig);
            this.$markerFront.update(this.layerConfig);
            this.$cursorLayer.update(this.layerConfig);
            this.$moveTextAreaToCursor();
            return;
        }

        if (changes & this.CHANGE_TEXT) {
            this.$textLayer.update(this.layerConfig);
            if (this.showGutter)
                this.$gutterLayer.update(this.layerConfig);
        }
        else if (changes & this.CHANGE_LINES) {
            if (this.$updateLines()) {
                this.$updateScrollBar();
                if (this.showGutter)
                    this.$gutterLayer.update(this.layerConfig);
            }
        } else if (changes & this.CHANGE_GUTTER) {
            if (this.showGutter)
                this.$gutterLayer.update(this.layerConfig);
        }

        if (changes & this.CHANGE_CURSOR) {
            this.$cursorLayer.update(this.layerConfig);
            this.$moveTextAreaToCursor();
            this.$highlightGutterLine && this.$updateGutterLineHighlight(false);
        }

        if (changes & (this.CHANGE_MARKER | this.CHANGE_MARKER_FRONT)) {
            this.$markerFront.update(this.layerConfig);
        }

        if (changes & (this.CHANGE_MARKER | this.CHANGE_MARKER_BACK)) {
            this.$markerBack.update(this.layerConfig);
        }

        if (changes & this.CHANGE_SIZE)
            this.$updateScrollBar();
    }