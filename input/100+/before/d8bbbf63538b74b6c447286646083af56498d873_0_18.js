function(layer) {
        if(layer && this.attrs.drawFunc) {
            var stage = layer.getStage();
            var context = layer.getContext();
            var family = [];
            var parent = this.parent;

            family.unshift(this);
            while(parent) {
                family.unshift(parent);
                parent = parent.parent;
            }

            context.save();
            for(var n = 0; n < family.length; n++) {
                var node = family[n];
                var t = node.getTransform();

                var m = t.getMatrix();
                context.transform(m[0], m[1], m[2], m[3], m[4], m[5]);
            }

            this.tempLayer = layer;

            /*
             * pre styles include alpha, linejoin
             */
            var absAlpha = this.getAbsoluteAlpha();
            if(absAlpha !== 1) {
                context.globalAlpha = absAlpha;
            }
            this.applyLineJoin();

            // draw the shape
            this.appliedShadow = false;
            this.attrs.drawFunc.call(this);
            context.restore();
        }
    }