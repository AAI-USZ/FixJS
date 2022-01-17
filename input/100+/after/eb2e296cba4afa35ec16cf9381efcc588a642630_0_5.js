function(opened_file, editor) {
            if (opened_file.indexOf("diff for ") !== 0) {
                //reset update function of gutter layer to original funtion
                var gutter = editor.renderer.$gutterLayer;
                if (gutter.$originalUpdate) {
                    gutter.update = gutter.$originalUpdate;
                    gutter.$originalUpdate = undefined;
                }
            } else { //opened_file.indexOf("diff for ") === 0
                //use own update function for gutter layer to set line numbers
                var dom = require("ace/lib/dom");
                var oop = require("ace/lib/oop");
                var EventEmitter = require("ace/lib/event_emitter").EventEmitter;

                var update = function(config) {
                    if (config.lines) {
                        this.lines = config.lines;
                    } else {
                        this.$config = config;
                        config.lines = this.lines;
                    }

                    var emptyAnno = {className: "", text: []};
                    var html = [];
                    var fold = this.session.getNextFoldLine(i);
                    var foldStart = fold ? fold.start.row : Infinity;
                    var foldWidgets = this.$showFoldWidgets && this.session.foldWidgets;

                    for (var i = 0; i < config.lines.length; ++i) {
                        if(i > foldStart) {
                            i = fold.end.row + 1;
                            fold = this.session.getNextFoldLine(i, fold);
                            foldStart = fold ?fold.start.row :Infinity;
                        }

                        var annotation = this.$annotations[i] || emptyAnno;
                        var lineNumber = config.lines[i];

                        html.push("<div class='ace_gutter-cell",
                            this.$decorations[i] || "",
                            this.$breakpoints[i] ? " ace_breakpoint " : " ",
                            annotation.className,
                            "' title='", annotation.text.join("\n"),
                            "' style='height:", config.lineHeight, "px;'>", lineNumber);

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
                    }
                    this.element = dom.setInnerHtml(this.element, html.join(""));
                    this.element.style.height = config.minHeight + "px";
                    
                    var gutterWidth = this.element.offsetWidth;
                    if (gutterWidth !== this.gutterWidth) {
                        this.gutterWidth = gutterWidth;
                        this._emit("changeGutterWidth", gutterWidth);
                    }
                };

                editor.renderer.$gutterLayer.$originalUpdate = 
                         editor.renderer.$gutterLayer.update;
                editor.renderer.$gutterLayer.update = update;
            }
        }