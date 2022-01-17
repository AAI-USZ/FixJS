function () {
    var ce = sagecell.util.createElement;
    this.continuous = this.control.subtype === "continuous" ||
                      this.control.subtype === "continuous_range";
    this.range = this.control.subtype === "discrete_range" ||
                 this.control.subtype === "continuous_range";
    var container = ce("span");
    this.value_boxes = $();
    container.style.whitespace = "nowrap";
    this.slider = ce("span", {"class": "sagecell_sliderControl"});
    container.appendChild(this.slider);
    var that = this;
    if (this.continuous) {
        if (this.range) {
            this.values = this.control["default"].slice();
            $(this.slider).slider({"min": this.control.range[0],
                                   "max": this.control.range[1],
                                   "step": this.control.step,
                                   "range": true,
                                   "values": this.values,});
            var min_text = ce("input", {"class": "sagecell_interactValueBox",
                                        "value": this.values[0].toString()});
            var max_text = ce("input", {"class": "sagecell_interactValueBox",
                                        "value": this.values[1].toString()});
            min_text.size = min_text.value.length;
            max_text.size = max_text.value.length;
            min_text.style.marginTop = max_text.style.marginTop = "3px";
            $(this.slider).on("slide", function (event, ui) {
                that.values = ui.values.slice()
                min_text.value = that.values[0].toString();
                max_text.value = that.values[1].toString();
                min_text.size = min_text.value.length;
                max_text.size = max_text.value.length;
            });
            $(min_text).change(function () {
                var val = parseFloat(min_text.value);
                if (that.control.range[0] <= val &&
                        val <= $(that.slider).slider("option", "values")[1]) {
                    that.values[0] = val;
                    $(that.slider).slider("option", "values", that.values);
                    min_text.value = val.toString();
                } else {
                    min_text.value = that.values[0].toString();
                }
                min_text.size = min_text.value.length + 1;
            });
            $(max_text).change(function () {
                var val = parseFloat(max_text.value);
                if ($(that.slider).slider("option", "values")[0] <= val &&
                        val <= that.control.range[1]) {
                    that.values[1] = val;
                    $(that.slider).slider("option", "values", that.values);
                    max_text.value = val.toString();
                } else {
                    max_text.value = that.values[1].toString();
                }
                max_text.size = max_text.value.length + 1;
            });
            $([min_text, max_text]).keyup(function (event) {
                event.target.size = event.target.value.length + 1;
            });
            $([min_text, max_text]).focus(function (event) {
                event.target.size = event.target.value.length + 1;
            });
            $([min_text, max_text]).blur(function (event) {
                event.target.size = event.target.value.length;
            });
            var span = ce("span", {}, [
                document.createTextNode("("),
                min_text,
                document.createTextNode(", "),
                max_text,
                document.createTextNode(")")
            ]);
            this.value_boxes = $([min_text, max_text]);
            span.style.fontFamily = "monospace";
            container.appendChild(span);
        } else {
            this.value = this.control["default"];
            $(this.slider).slider({"min": this.control.range[0],
                                   "max": this.control.range[1],
                                   "step": this.control.step,
                                   "value": this.value});
            var textbox = ce("input", {"class": "sagecell_interactValueBox",
                                       "value": this.value.toString()});
            textbox.size = textbox.value.length + 1;
            $(this.slider).on("slide", function (event, ui) {
                textbox.value = (that.value = ui.value).toString();
                textbox.size = textbox.value.length + 1;
            });
            $(textbox).change(function () {
                var val = parseFloat(textbox.value);
                if (that.control.range[0] <= val && val <= that.control.range[1]) {
                    that.value = val;
                    $(that.slider).slider("option", "value", that.value);
                    textbox.value = val.toString();
                } else {
                    textbox.value = that.value.toString();
                }
                textbox.size = textbox.value.length + 1;
            });
            $(textbox).keyup(function (event) {
                textbox.size = textbox.value.length + 1;
            });
            container.appendChild(textbox);
            this.value_boxes = $(textbox);
        }
    } else if (this.range) {
        this.values = this.control["default"].slice();
        $(this.slider).slider({"min": this.control.range[0],
                               "max": this.control.range[1],
                               "step": this.control.step,
                               "range": true,
                               "values": this.values});
        var span = ce("span", {}, [
            document.createTextNode("(" + this.control.values[this.values[0]] +
                    ", " + this.control.values[this.values[1]] + ")")
        ]);
        span.style.fontFamily = "monospace";
        $(this.slider).on("slide", function (event, ui) {
            that.values = ui.values.slice()
            this.values = ui.values.slice();
            $(span).text("(" + that.control.values[that.values[0]] +
                         ", " + that.control.values[that.values[1]] + ")");
        });
        container.appendChild(span);
    } else {
        this.value = this.control["default"];
        $(this.slider).slider({"min": this.control.range[0],
                               "max": this.control.range[1],
                               "step": this.control.step,
                               "value": this.value});
        var span = ce("span", {}, [
            document.createTextNode(this.control.values[this.value].toString())
        ]);
        span.style.fontFamily = "monospace";
        $(this.slider).on("slide", function (event, ui) {
            $(span).text(that.control.values[that.value = ui.value].toString());
        });
        container.appendChild(span);
    }
    return container;
}