function (ctx) {
        var context = ctx || cc.renderContext;

        if (cc.renderContextType == cc.CANVAS) {
            //context.globalAlpha = this.getOpacity() / 255;
            var tWidth = this.getContentSize().width;
            var tHeight = this.getContentSize().height;
            var apip = this.getAnchorPointInPoints();
            var tGradient = context.createLinearGradient(-apip.x, apip.y,
                -apip.x + tWidth, -(apip.y + tHeight));

            tGradient.addColorStop(0, "rgba(" + Math.round(this._squareColors[0].r * 255) + "," + Math.round(this._squareColors[0].g * 255) + ","
                + Math.round(this._squareColors[0].b * 255) + "," + this._squareColors[0].a.toFixed(4) + ")");
            tGradient.addColorStop(1, "rgba(" + Math.round(this._squareColors[3].r * 255) + "," + Math.round(this._squareColors[3].g * 255) + ","
                + Math.round(this._squareColors[3].b * 255) + "," + this._squareColors[3].a.toFixed(4) + ")");

            context.fillStyle = tGradient;
            context.fillRect(-apip.x, apip.y, tWidth, -tHeight);
        } else {
            /*cc.NODE_DRAW_SETUP();
             ccGLEnableVertexAttribs( kCCVertexAttribFlag_Position | kCCVertexAttribFlag_Color );

             //
             // Attributes
             //
             glVertexAttribPointer(kCCVertexAttrib_Position, 2, GL_FLOAT, GL_FALSE, 0, m_pSquareVertices);
             glVertexAttribPointer(kCCVertexAttrib_Color, 4, GL_FLOAT, GL_FALSE, 0, m_pSquareColors);
             ccGLBlendFunc( m_tBlendFunc.src, m_tBlendFunc.dst );
             glDrawArrays(GL_TRIANGLE_STRIP, 0, 4);   */
        }
        this._super(context);

        cc.INCREMENT_GL_DRAWS(1);
    }