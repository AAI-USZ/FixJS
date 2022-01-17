function p_drawGhost(ctx) {
    var me = this.$;
    if (me.__ghost && !me.__ghostLock) {
        ctx.save();
        me.__ghostLock = true;
        me.__ghost._matrix.apply(ctx);
        ctx.globalAlpha = 0.6;
        me.draw(ctx);
        me.__ghostLock = false;
        ctx.restore();
    }
}