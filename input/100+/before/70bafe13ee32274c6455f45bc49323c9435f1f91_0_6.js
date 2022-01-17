function (control_id) {
    var ce = sagecell.util.createElement;
    var that = this;
    if (this.control.subtype === "list") {
        var select = ce("select");
        for (var i = 0; i < this.control.values; i++) {
            select.appendChild(ce("option", {}, [
                document.createTextNode(this.control.value_labels[i])
            ]));
        }
        this.value = select.selectedIndex = this.control.default;
        $(select).change(function (event) {
            that.value = event.target.selectedIndex;
            $(event.target).trigger("changedone");
        });
        select.style.width = this.control.width;
        this.changing = select;
        return select;
    } else if (this.control.subtype === "radio" || this.control.subtype === "button") {
        this.changing = $();
        var table = ce("table");
        var i = -1;
        for (var row = 0; row < this.control.nrows; row++) {
            var tr = ce("tr");
            for (var col = 0; col < this.control.ncols; col++) {
                var id = control_id + "_" + (++i);
                var option = ce("input", {"type": "radio", "name": control_id, "id": id});
                if (i === this.control.default) {
                    option.checked = true;
                    this.value = i;
                }
                var label = ce("label", {"for": id}, [
                    document.createTextNode(this.control.value_labels[i])
                ]);
                label.style.width = this.control.width;
                $(option).change(function (i) {
                    return function (event) {
                        that.value = i;
                        $(event.target).trigger("changedone");
                    };
                }(i));
                this.changing = this.changing.add(option);
                tr.appendChild(ce("td", {}, [option, label]));
            }
            table.appendChild(tr);
        }
        if (this.control.subtype === "button") {
            this.changing.button();
        }
        return table;
    }
}