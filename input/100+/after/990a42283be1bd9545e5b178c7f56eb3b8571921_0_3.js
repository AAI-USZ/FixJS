function p_drawPrediction(ctx) {
    var me = this.$;
    if (me.__nvec) {
        var v_next = me.__nvec;
        var apt0 = me._pradopt([ v_next[0], v_next[1] ]), // absolute point 0
            apt1 = me._pradopt([ v_next[2], v_next[3] ]); // absolute point 1
        ctx.save();
        ctx.setTransform(1, 0, 0, 1, 0, 0); // reset
        ctx.beginPath();
        ctx.strokeStyle = '#ff0';
        ctx.lineWidth = 4;
        ctx.moveTo(apt0[0], apt0[1]);
        ctx.lineTo(apt1[0], apt1[1]);
        ctx.stroke();
        ctx.restore();
    }
}