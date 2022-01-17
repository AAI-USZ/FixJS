function () {
    var ce = sagecell.util.createElement;
    var div = ce("div");
    this.sliders = $();
    this.value_boxes = $();
    this.values = this.control.default.slice();
    for (var i = 0; i < this.control.sliders; i++) {
        var column = ce("div");
        column.style.width = "50px";
        column.style.cssFloat = "left";
        column.style.textAlign = "center";
        var slider = ce("span", {"class": "sagecell_multiSliderControl"});
        slider.style.display = "block";
        slider.style.margin = "1em 0.5em 1em 0.8em";
        column.appendChild(slider);
        var that = this;
        if (this.control.subtype === "continuous") {
            var textbox = ce("input", {"class": "sagecell_interactValueBox"});
            textbox.value = this.values[i].toString();
            textbox.size = textbox.value.length + 1;
            textbox.style.display = this.control.display_values ? "" : "none";
            $(textbox).change((function (i) {
                return function (event) {
                    var textbox = event.target;
                    var val = parseFloat(textbox.value);
                    if (that.control.range[i][0] <= val && val <= that.control.range[i][1]) {
                        that.values[i] = val;
                        $(that.sliders[i]).slider("option", "value", val);
                        textbox.value = val.toString();
                    } else {
                        textbox.value = that.values[i].toString();
                    }
                    textbox.size = textbox.value.length + 1;
                };
            }(i)));
            $(textbox).keyup(function (event) {
                event.target.size = event.target.value.length + 1;
            });
            that.value_boxes = that.value_boxes.add(textbox);
            column.appendChild(textbox);
        } else {
            var span = ce("span", {},
                    [document.createTextNode(this.values[i].toString())]);
            span.style.fontFamily = "monospace";
            span.style.display = this.control.display_values ? "" : "none";
            that.value_boxes = that.value_boxes.add(span);
            column.appendChild(span);
        }
        var slide_handler = (function (i) {
            return function (event, ui) {
                that.values[i] = ui.value;
                var value_box = that.value_boxes[i];
                if (that.control.subtype === "continuous") {
                    value_box.value = ui.value.toString();
                    value_box.size = value_box.value.length + 1;
                    $(value_box).data("old_value", value_box.value);
                } else {
                    $(value_box).text(that.control.values[i][ui.value]);
                }
            };
        }(i));
        $(slider).slider({"orientation": "vertical",
                          "value": this.control.default[i],
                          "min": this.control.range[i][0],
                          "max": this.control.range[i][1],
                          "step": this.control.step[i],
                          "slide": slide_handler});
        this.sliders = this.sliders.add(slider);
        div.appendChild(column);
    }
    return div;
}