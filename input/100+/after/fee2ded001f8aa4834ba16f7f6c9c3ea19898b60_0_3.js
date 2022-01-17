function p_drawPrediction(ctx) {
    var me = this.$;
    if (me.__napt0) {
        var apt0 = me.__napt0, // absolute point 0
            apt1 = me.__napt1; // absolute point 1
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