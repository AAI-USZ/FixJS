function ContainerElement(text, scale) {
    this.x = null;
    this.y = null;

    this.width = null;
    this.height = null;

    this.text = null;

    this.textWidth = null;
    this.textHeight = null;

    this.elements = null;
    this.widths = null;
    this.heights = null;
    this.displace = null;

    if (scale == null)
        this.scale = 1;
    else
        this.scale = scale;

    this.setText(text);
}