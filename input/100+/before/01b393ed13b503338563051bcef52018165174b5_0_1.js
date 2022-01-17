function() {
        this.oCss = this.options.cssActions;
        this.container = new Element("div", {
            "class": this.options.cssClass,
            "styles": {
                "padding": Object.values(this.element.getStyles("padding")).toString(),
                "margin": Object.values(this.element.getStyles("margin")).toString()
            }
        }).inject(this.element, "after");

        if (!(Browser.ie && Browser.version <= 7)) {
            var iElementSize = this.element.getComputedSize();
            this.container.setStyles({
                "height": iElementSize.height.toInt(),
                "width": iElementSize.width.toInt()
            });
        }

        this.element.setStyle("display", "none");

        this.list = new Element("ul", {
            "class": "root"
        }).inject(this.container);

        this.fnNavigate = this._navigate.bind(this);

        this.rebuild();

        if (this.options.inheritCSSClass) {
            this.container.addClass(this.element.get("class"));
        }

        document.addEvent("click", function(e) {
            this.list.removeClass(this.oCss.e);
            this.list.removeProperty("style");
            this.list.fireEvent("blur", e);
            document.removeEvent("keydown", this.fnNavigate);
        }.bind(this));
    }