function p_drawGhostVec(ctx) {
    var me = this.$;
    if (me.__ghost_m) {
        ctx.save();
        me.__ghost_m.apply(ctx);
        var apt = me._adopt([ -10, 0 ]);
        ctx.beginPath();
        ctx.strokeStyle = '#ff0';
        ctx.lineWidth = 4;
        ctx.moveTo(0, 0);
        ctx.lineTo(apt[0], apt[1]);
        ctx.stroke();
        ctx.restore();
    }
}