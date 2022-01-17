function () {
    if (this.control.subtype === "textarea") {
        this.textbox = sagecell.util.createElement("textarea",
            {"rows": this.control.height, "cols": this.control.width});
    } else if (this.control.subtype === "input") {
        this.textbox = sagecell.util.createElement("input",
            {"size": this.control.width});
    }
    this.textbox.value = this.control.default;
    return this.textbox;
}