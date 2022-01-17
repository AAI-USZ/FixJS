function(oLI, idx) {
            var oCheckbox = null;
            if ((oCheckbox = oLI.getElement("input[type=checkbox]"))) {
                oCheckbox.set("checked", oLI.hasClass(this.oCss.c));
            }
            if (oLI.hasClass(this.oCss.c)) {
                this.element.getElements("option")[idx].set("selected", true);
                if (this.showSelected) {
                    this.showSelected.set("html", oLI.get("html"));
                    this.showSelected.set("data-value", oLI.get("data-value"));
                }
            }
        }