function () {
    var selector = sagecell.util.createElement("span", {"class": "sagecell_colorSelector"});
    var text = document.createTextNode(this.control["default"]);
    this.span = sagecell.util.createElement("span", {}, [selector]);
    if (!this.control.hide_input) {
        selector.style.marginRight = "10px";
        this.span.appendChild(text);
    }
    selector.style.backgroundColor = this.control["default"];
    var that = this;
    $(selector).ColorPicker({
        "color": this.control["default"],
        "onChange": function (hsb, hex, rgb, el) {
            text.nodeValue = that.color = selector.style.backgroundColor = "#" + hex;
        },
        "onHide": function () {
            $(that.span).change();
        }
    });
    return this.span;
}