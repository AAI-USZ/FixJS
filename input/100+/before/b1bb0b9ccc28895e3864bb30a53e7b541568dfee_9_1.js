function(config) {
        this.$config = config;

        var emptyAnno = {className: "", text: []};
        var html = [];
        var i = config.firstRow;
        var lastRow = config.lastRow;
        var fold = this.session.getNextFoldLine(i);
        var foldStart = fold ? fold.start.row : Infinity;
        var foldWidgets = this.$showFoldWidgets && this.session.foldWidgets;

        while (true) {
            if(i > foldStart) {
                i = fold.end.row + 1;
                fold = this.session.getNextFoldLine(i, fold);
                foldStart = fold ?fold.start.row :Infinity;
            }
            if(i > lastRow)
                break;

            var annotation = this.$annotations[i] || emptyAnno;
            html.push("<div class='ace_gutter-cell",
                this.$decorations[i] || "",
                this.$breakpoints[i] ? " ace_breakpoint " : " ",
                annotation.className,
                "' title='", annotation.text.join("\n"),
                "' style='height:", config.lineHeight, "px;'>", (i+1));

            if (foldWidgets) {
                var c = foldWidgets[i];
                // check if cached value is invalidated and we need to recompute
                if (c == null)
                    c = foldWidgets[i] = this.session.getFoldWidget(i);
                if (c)
                    html.push(
                        "<span class='ace_fold-widget ", c,
                        c == "start" && i == foldStart && i < fold.end.row ? " closed" : " open",
                        "'></span>"
                    );
            }

            var wrappedRowLength = this.session.getRowLength(i) - 1;
            while (wrappedRowLength--) {
                html.push("</div><div class='ace_gutter-cell' style='height:", config.lineHeight, "px'>\xA6");
            }

            html.push("</div>");

            i++;
        }
        this.element = dom.setInnerHtml(this.element, html.join(""));
        this.element.style.height = config.minHeight + "px";
        
        var gutterWidth = this.element.offsetWidth;
        if (gutterWidth !== this.gutterWidth) {
            this.gutterWidth = gutterWidth;
            this._emit("changeGutterWidth", gutterWidth);
        }
    }