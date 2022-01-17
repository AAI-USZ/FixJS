function() {
        this.list.set("html", "");
        var oA = null;
        if ((oA = this.list.getNext("a"))) {
            oA.dispose();
        }

        var oOption = this.element.getSelected()[0]||new Element("option", {"text":"","data-value":""});
        this.showSelected = new Element("a", {
            "href": "",
            "events": {
                "click": function(e) {
                    e.preventDefault();
                },
                "mousedown": function(e) {
                    e.preventDefault();
                }
            },
            "html": oOption.get("text"),
            "title": (this.options.usetitles)?oOption.get("text"):"",
            "data-value": oOption.get("data-value")
        }).inject(this.container);
    }