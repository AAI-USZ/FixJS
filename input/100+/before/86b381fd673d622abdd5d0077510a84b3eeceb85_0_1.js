function () {
        var self = this;
        //generate skin controls
        this.el.addClass("connection");

        this.el.css({ "position": "absolute",
                      "background-color": "rgba(0, 0, 0, 0)",
                      "left": 0,
                       "top": 0 });

        this.el.outerWidth(2 * this.borderW).outerHeight(2 * this.borderW);

        this.skinParts.path = this.paper.path("M0,0").attr({ stroke: "#000", fill: "none", "stroke-width": "2" });
        this.skinParts.pathShadow = this.paper.path("M0,0").attr({ stroke: "#000", fill: "none", "stroke-width": "6", "opacity" : 0.05 });

        this.skinParts.pathShadow.click(function () {
            self.parentComponent._setSelection([self.getId()], false);
        });

        $(this.skinParts.path.node).attr("id", this.getId());

        this._initializeFromNode();
    }