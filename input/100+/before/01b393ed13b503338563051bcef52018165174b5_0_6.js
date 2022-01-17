function() {
        this.list.addEvent("click", function(e) {
            e.stopPropagation();
            e.preventDefault();
            this.list.toggleClass(this.oCss.e);
        }.bind(this));

        var aLI = this.list.getElements("li");
        aLI.each(function(oLI) {
            oLI.addEvents({
                "mouseover": function(e) {
                    if (!e.target.hasClass(this.oCss.d)) {
                        this._fnAlterClass(e.target, aLI, this.oCss.h);
                    }
                }.bind(this),
                "click": function(e) {
                    if (!e.target.hasClass(this.oCss.d)) {
                        this._fnAlterClass(e.target, aLI, this.oCss.c);
                        this._setSelected();
                    }
                }.bind(this)
            });
        }, this);
    }