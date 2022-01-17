function(e) {
        var oLI = this.container.getElement("li." + this.oCss.h),
            aLI = this.container.getElements("li:not(." + this.oCss.o + ",." + this.oCss.d + ")"),
            oNext = null;

        switch(e.key) {
            case "down":
                e.preventDefault();
                if ((oNext = aLI[aLI.indexOf(oLI)+1]) && !oNext.hasClass(this.oCss.d)) {
                    this._fnAlterClass(oNext, oLI, this.oCss.h);
                }
            break;
            case "up":
                e.preventDefault();
                if ((oNext = aLI[aLI.indexOf(oLI)-1]) && !oNext.hasClass(this.oCss.d)) {
                    this._fnAlterClass(oNext, oLI, this.oCss.h);
                }
            break;
            case "space":
                e.preventDefault();
                if (oLI.get("html") && !oLI.hasClass(this.oCss.d)) {
                    if (e.control) {
                        oLI.addClass(this.oCss.c);
                    } else {
                        this._fnAlterClass(oLI, aLI, this.oCss.c);
                    }
                    this._setSelected();
                }
            break;
            case "enter":
                if (oLI.get("html") && !oLI.hasClass(this.oCss.d)) {
                    this._fnAlterClass(oLI, aLI, this.oCss.c);
                    this._setSelected();
                    this.list.removeClass(this.oCss.e);
                }
            break;
            case "esc":
                this.container.getElement("ul").removeClass(this.oCss.e);
                document.removeEvent("keydown", this.fnNavigate);
            break;
            default:
                if (e.key.length == 1) {
                    e.preventDefault();
                    for (var i=0 ; i < aLI.length ; i++) {
                        if (e.code == aLI[i].get("html").charCodeAt(0)) {
                            this._fnAlterClass(aLI[i], aLI, this.oCss.h);
                            break;
                        }
                    }
                }
            break;
        }
    }