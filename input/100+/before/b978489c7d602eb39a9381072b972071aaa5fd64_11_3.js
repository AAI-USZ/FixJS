function (ctx) {
        //TODO need to fix child position in relation to parent
        var context = ctx || cc.renderContext;

        if (cc.renderContextType == cc.CANVAS) {
            //context.globalAlpha = this.getOpacity() / 255;
            var tWidth = this.getContentSize().width;
            var tHeight = this.getContentSize().height;
            var tGradient = context.createLinearGradient(-this.getAnchorPointInPixels().x, this.getAnchorPointInPixels().y,
                -this.getAnchorPointInPixels().x + tWidth, -(this.getAnchorPointInPixels().y + tHeight));

            tGradient.addColorStop(0, "rgba(" + this._squareColors[0].r + "," + this._squareColors[0].g + ","
                + this._squareColors[0].b + "," + this._squareColors[0].a / 255 + ")");
            tGradient.addColorStop(1, "rgba(" + this._squareColors[3].r + "," + this._squareColors[3].g + ","
                + this._squareColors[3].b + "," + this._squareColors[3].a / 255 + ")");

            context.fillStyle = tGradient;
            context.fillRect(-this.getAnchorPointInPixels().x, this.getAnchorPointInPixels().y, tWidth, -tHeight);
        }
        this._super();
        return;
        // Default GL states: GL_TEXTURE_2D, GL_VERTEX_ARRAY, GL_COLOR_ARRAY, GL_TEXTURE_COORD_ARRAY
        // Needed states: GL_VERTEX_ARRAY, GL_COLOR_ARRAY
        // Unneeded states: GL_TEXTURE_2D, GL_TEXTURE_COORD_ARRAY

        // glDisableClientState(GL_TEXTURE_COORD_ARRAY);

        // glDisable(GL_TEXTURE_2D);

        // glVertexPointer(2, GL_FLOAT, 0, this._squareVertices);

        // glColorPointer(4, GL_UNSIGNED_BYTE, 0, this._squareColors);

        var newBlend = false;
        if (this._blendFunc.src != cc.BLEND_SRC || this._blendFunc.dst != cc.BLEND_DST) {
            newBlend = true;
            //glBlendFunc(this._blendFunc.src, this._blendFunc.dst);
        }
        else if (this._opacity != 255) {
            newBlend = true;
            // glBlendFunc(GL_SRC_ALPHA, GL_ONE_MINUS_SRC_ALPHA);
        }

        // glDrawArrays(GL_TRIANGLE_STRIP, 0, 4);

        if (newBlend) {
            // glBlendFunc(cc.BLEND_SRC, cc.BLEND_DST);
        }
        // restore default GL state
        // glEnableClientState(GL_TEXTURE_COORD_ARRAY);
        // glEnable(GL_TEXTURE_2D);

    }