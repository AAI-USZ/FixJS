function(ctx, time) {
    if (this.disabled) return;
    this.rendering = true;
    ctx.save();
    var wasDrawn = false;
    if (wasDrawn = (this.onframe(time) 
                    && this.prepare())) {
        this.transform(ctx);
        this.draw(ctx);
        this.visitChildren(function(elm) {
            elm.render(ctx, time);
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