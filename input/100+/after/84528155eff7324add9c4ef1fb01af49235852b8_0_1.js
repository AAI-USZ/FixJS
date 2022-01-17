function(pt, radius) {
    this.x.pos = pt;
    this.x.reg = [ 0, 0 ];
    var b = this;
    this.x.__bounds = [ 0, 0, radius*2, radius*2];
    this.paint(function(ctx) {
        DU.qDraw(ctx, b.s, b.f,
                 function() {
                    ctx.arc(0, 0, radius, 0, Math.PI*2, true);
                 });
    });
    if (modCollisions) this.v.reactAs(
            Builder.arcPath(0/*pt[0]*/,0/*pt[1]*/,radius, 0, 1, 12));
    return this;
}