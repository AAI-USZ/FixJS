function(startDw, endDw, type) {
    var startPx = this.pos2Px(startDw);
    var endPx = this.pos2Px(endDw);

    this.save();
    this._ctx.lineWidth = this._props.arrowLineWidthPx;
    this._setLineStyles(type);

    var offsetDw = endDw.subtract(startDw);
    var offsetPx = endPx.subtract(startPx);
    var arrowLengthPx = offsetPx.modulus();
    if (arrowLengthPx < 1) {
        // if too short, just draw a simple line
        this.line(startDw, endDw);
        return;
    }

    var arrowheadMaxLengthPx = this._props.arrowheadLengthRatio * this._props.arrowLineWidthPx;
    var arrowheadLengthPx = Math.min(arrowheadMaxLengthPx, arrowLengthPx / 2);
    var arrowheadCenterLengthPx = (1 - this._props.arrowheadOffsetRatio) * arrowheadLengthPx;
    var lineLengthPx = arrowLengthPx - arrowheadCenterLengthPx;
    var lineEndDw = startDw.add(offsetDw.x(lineLengthPx / arrowLengthPx));
    this.line(startDw, lineEndDw, type);
    this._arrowhead(endDw, offsetDw, arrowheadLengthPx);
    this.restore();
}