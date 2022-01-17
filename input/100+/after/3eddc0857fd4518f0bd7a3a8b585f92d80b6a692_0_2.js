function(text) {
    this.elements = new Array();
    this.widths = new Array();
    this.heights = new Array();
    this.displace = new Array();

    if (text == null || text == "") {
        this.text = "";

        this.width = 15;
        this.height = 15;

        this.textWidth = 15;
        this.textHeight = 15;
    }
    else {
        this.text = text;

        var size = getTextWidthHeight(text, fontSize*this.scale);
        this.textWidth = size[0];
        this.textHeight = size[1];

        this.parseText(text);

        this.width = 0;
        this.height = 0;
        for (var n = 0; n < this.elements.length; n++) {
            this.width += this.widths[n];
            this.height = Math.max(this.height, this.heights[n]);
        }
    }
    if (this.parent != undefined) {
        this.parent.update();
    }
}