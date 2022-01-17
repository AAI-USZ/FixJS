function(pt, lines, size, font) {
    this.x.pos = pt;
    var text = lines instanceof Text ? lines
                     : new Text(lines, Builder.font(font, size));
    this.x.text = text;
    if (!text.stroke) { text.stroke = this.s; }
    else { this.s = text.stroke; }
    if (!text.fill) { text.fill = this.f; }
    else { this.f = text.fill; }
    return this;
}