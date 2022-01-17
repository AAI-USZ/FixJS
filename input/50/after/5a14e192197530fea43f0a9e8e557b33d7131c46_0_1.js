function highlight(color) {
    document.designMode = "on";
    document.execCommand("BackColor", false, color);
    document.designMode = "off";
}