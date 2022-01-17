function () {
    this.input = sagecell.util.createElement("input", {"type": "checkbox"});
    this.input.checked = this.control.default;
    return this.input;
}