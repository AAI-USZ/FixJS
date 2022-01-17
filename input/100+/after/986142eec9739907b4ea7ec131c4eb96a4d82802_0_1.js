function(startDw, endDw, type) {
    var offsetDw = endDw.subtract(startDw);
    var offsetPx = this.vec2Px(offsetDw);
    var arrowLengthPx = offsetPx.modulus();
    var lineEndDw, drawArrowHead, arrowheadLengthPx;
    if (arrowLengthPx < 1) {
        // if too short, just draw a simple line
        lineEndDw = endDw;
        drawArrowHead = false;
    } else {
        var arrowheadMaxLengthPx = this._props.arrowheadLengthRatio * this._props.arrowLineWidthPx;
        arrowheadLengthPx = Math.min(arrowheadMaxLengthPx, arrowLengthPx / 2);
        var arrowheadCenterLengthPx = (1 - this._props.arrowheadOffsetRatio) * arrowheadLengthPx;
        var lineLengthPx = arrowLengthPx - arrowheadCenterLengthPx;
        lineEndDw = startDw.add(offsetDw.x(lineLengthPx / arrowLengthPx));
        drawArrowHead = true;
    }

    var startPx = this.pos2Px(startDw);
    var lineEndPx = this.pos2Px(lineEndDw);
    this.save();
    this._ctx.lineWidth = this._props.arrowLineWidthPx;
    this._setLineStyles(type);
    this._ctx.beginPath();
    this._ctx.moveTo(startPx.e(1), startPx.e(2));
    this._ctx.lineTo(lineEndPx.e(1), lineEndPx.e(2));
    this._ctx.stroke();
    if (drawArrowHead) {
        this._arrowhead(endDw, offsetDw, arrowheadLengthPx);
    }
    this.restore();
}