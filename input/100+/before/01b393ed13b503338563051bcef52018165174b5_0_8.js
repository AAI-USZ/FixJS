function() {
        this.list.addEvents({
            "click": function(e) {
                e.stopPropagation();
            },
            "focus": function(e) {
                var oUL = this.list,
                    aUL = $$("select[style] + div." + this.options.cssClass + " > ul.root");
                aUL.removeClass(this.oCss.e);
                aUL.removeProperty("style");

                var oLI = oUL.getElement("li." + this.oCss.c)||oUL.getElement("li:first-child");
                this._fnAlterClass(oLI, oUL.getElements("li"), this.oCss.h);
                document.addEvent("keydown", this.fnNavigate);
            }.bind(this),
            "blur": function(e) {
                this.list.getElements("li").removeClass(this.oCss.h);
                document.removeEvent("keydown", this.fnNavigate);
            }.bind(this)
        });

        var aLI = this.list.getElements("li:not(.optgroup)");
        aLI.each(function(oLI) {
            oLI.addEvents({
                "click": function(e) {
                    var oTarget = (e.target === oLI)?e.target:oLI;
                    if (!oTarget.hasClass(this.oCss.d)) {
                        if (e.control) {
                            oTarget.addClass(this.oCss.c);
                        } else {
                            this._fnAlterClass(oTarget, aLI, this.oCss.c);
                        }
                        this._setSelected();
                        this.list.fireEvent("focus", e);
                    }
                }.bind(this)
            });
        }, this);
    }