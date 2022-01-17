function() {
        this._reset();

        var iCount = 0;
        this.element.getElements("option,optgroup").each(function(oOpt) {
            var bOption = oOpt.get("tag") === "option";
            if (bOption) {
                if (!this.options.skipfirst || iCount > 0) {
                    if (oOpt.getParent() !== this.o_parent) {
                        this.o_parent = oOpt.getParent();
                        this.list = this.list.getParent("ul");
                    }
                    var oLI = new Element("li", {
                        "class": (oOpt.selected)?this.oCss.s:"",
                        "html": oOpt.get("text"),
                        "title": (this.options.usetitles)?oOpt.get("text"):"",
                        "data-value": oOpt.get("value")
                    }).inject(this.list);
                    if (this.options.checkboxes) {
                        oLI.set("html", "");
                        oLI.adopt(
                            new Element("label", {
                                "html": oOpt.get("text"),
                                "events": {
                                    "click": function(e) {
                                        e.preventDefault();
                                    }
                                }
                            }).grab(
                                new Element("input", {
                                    "type": "checkbox"
                                }), "top"
                            )
                        );
                    }
                    if (oOpt.hasAttribute("disabled")) {
                        oLI.addClass(this.oCss.d);
                    }
                }
                iCount++;
            } else {
                this.o_parent = oOpt;
                var oLIGroup = new Element("li", {
                        "class": oOpt.get("tag"),
                        "data-value": ""
                    }).inject(this.list);
                this.list = new Element("ul", {
                    "class": "ul-" + oOpt.get("tag")
                }).inject(oLIGroup);

                if (oOpt.get("label")) {
                    new Element("span", {
                        "html": oOpt.get("label"),
                        "events": {
                            "click": function(e) {
                                e.stop();
                            }
                        }
                    }).inject(oLIGroup, "top");
                }
            }
        }, this);

        this._addCustomEvents();

        if (this.options.cloneEvents) {
            this.container.cloneEvents(this.element);
            this.container.removeEvents("change");
            this.container.getElements("li:not(." + this.oCss.o + ",." + this.oCss.d + ")").addEvent("click", function(e) {
                this.element.fireEvent("change", e);
            }.bind(this));
        }
    }