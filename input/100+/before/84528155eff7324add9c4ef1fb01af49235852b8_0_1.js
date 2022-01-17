function(ctx) {
        DU.qDraw(ctx, b.s, b.f,
                 function() {
                    ctx.arc(0, 0, radius, 0, Math.PI*2, true);
                 });
    }