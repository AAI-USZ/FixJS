function(e) {
                var oUL = this.list,
                    aUL = $$("select[style] + div." + this.options.cssClass + " > ul.root");
                aUL.removeClass(this.oCss.e);
                aUL.removeProperty("style");

                var oLI = oUL.getElement("li." + this.oCss.c)||oUL.getElement("li:first-child");
                this._fnAlterClass(oLI, oUL.getElements("li"), this.oCss.h);
                document.addEvent("keydown", this.fnNavigate);
            }