function(ctx, gtime) {
    if (this.disabled) return;
    this.rendering = true;
    ctx.save();
    var wasDrawn = false;
    // checks if any time jumps (including repeat
    // modes) were performed
    var ltime = this.ltime(gtime);
    if (wasDrawn = (this.fits(ltime)
                    && this.onframe(ltime)
                    && this.prepare())) {
        this.transform(ctx);
        this.draw(ctx);
        // update gtime, if it was changed by ltime()
        gtime = this.gtime(ltime);
        this.visitChildren(function(elm) {
            elm.render(ctx, gtime);
        });
    }
    // immediately when drawn, element becomes visible,
    // it is reasonable
    this.visible = wasDrawn;
    ctx.restore();
    this.__postRender();
    this.rendering = false;
    if (wasDrawn) this.fire(C.X_DRAW,ctx);
}