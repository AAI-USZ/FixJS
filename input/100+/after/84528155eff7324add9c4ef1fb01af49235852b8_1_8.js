function(ctx, point) {
    ctx.save();
    var point = point || [0, 0],
        dimen = this.dimen(),
        accent = this.accent(dimen[1]),
        apt = [ point[0] - dimen[0]/2, 
                point[1] + accent - dimen[1]/2];
    ctx.font = this.font;
    ctx.textBaseline = Text.BASELINE_RULE;
    if (this.fill) {
        DU.applyFill(ctx, this.fill);
        var x = apt[0], y = apt[1];
        this.visitLines(function(line) {
            ctx.fillText(line, x, y);
            y += 1.2 * accent;
        });
    }
    if (this.stroke) {
        DU.applyStroke(ctx, this.stroke);
        var x = apt[0], y = apt[1];
        this.visitLines(function(line) {
            ctx.strokeText(line, x, y);
            y += 1.2 * accent;
        });
    }
    ctx.restore();
}