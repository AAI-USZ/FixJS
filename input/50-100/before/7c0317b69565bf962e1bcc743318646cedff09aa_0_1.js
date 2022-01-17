function(b) {
        return function(ctx) {
            var bi = b(this.$);
            DU.qDraw(ctx, bi.s, bi.f,
                     function() {
                        ctx.arc(0, 0, radius, 0, Math.PI*2, true);
                     });
        }
    }