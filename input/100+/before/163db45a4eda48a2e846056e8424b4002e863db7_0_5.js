function(e) {
            e.stop();
            var oUL = this.list,
                aUL = $$("select[style] + div." + this.options.cssClass + " > ul.root");
            if (oUL.hasClass(this.oCss.e)) {
                aUL.removeClass(this.oCss.e);
                document.removeEvent("keydown", this.fnNavigate);
            } else {
                var oLI = oUL.getElement("li." + this.oCss.c)||oUL.getElement("li:first-child");
                this._fnAlterClass(oLI, oUL.getElements("li"), this.oCss.h);
                this._fnAlterClass(oUL, aUL, this.oCss.e);
                document.addEvent("keydown", this.fnNavigate);
            }
        }