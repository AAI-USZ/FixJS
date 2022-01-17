function (out) {
            var cfg = this._cfg;
            this._skipContent = (out.sectionState == out.SECTION_KEEP) || !cfg.visible;
            out.beginSection({
                id : "__dialog_" + this._domId
            });

            if (this._skipContent) {
                return;
            }

            var viewport = aria.utils.Dom._getViewportSize();

            // constraint dialog to viewport
            var math = aria.utils.Math;
            var maxHeight = math.min(this._cfg.maxHeight, viewport.height);
            var maxWidth = math.min(this._cfg.maxWidth, viewport.width);
            this._div = new aria.widgets.container.Div({
                sclass : this._skinObj.divsclass,
                margins : "0 0 0 0",
                block : true,
                cssClass : this._context.getCSSClassNames(true) + " " + this._cfg.cssClass,
                height : this._cfg.height,
                minHeight : this._cfg.minHeight,
                maxHeight : maxHeight,
                width : this._cfg.width,
                minWidth : this._cfg.minWidth,
                maxWidth : maxWidth,
                scrollBarX : this._cfg.scrollBarX,
                scrollBarY : this._cfg.scrollBarY
            }, this._context, this._lineNumber);

            out.registerBehavior(this._div);
            this._div.writeMarkupBegin(out);

            out.beginSection({
                id : "__dialogContent_" + this._domId,
                keyMap : [{
                            key : "ESCAPE",
                            callback : {
                                fn : this.actionClose,
                                scope : this
                            }
                        }]
            });

        }