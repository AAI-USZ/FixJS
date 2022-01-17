function (rect, rotated, size) {
        this._rectInPixels = rect;
        this._rect = cc.RECT_PIXELS_TO_POINTS(rect);
        this._rectRotated = rotated;

        this.setContentSizeInPixels(size);
        this._updateTextureCoords(this._rectInPixels);

        var relativeOffsetInPixels = this._unflippedOffsetPositionFromCenter;

        /* WEBGL Code
         if (this._flipX) {
         //relativeOffsetInPixels.x = -relativeOffsetInPixels.x;
         }
         if (this._flipY) {
         //relativeOffsetInPixels.y = -relativeOffsetInPixels.y;
         }
         */

        this._offsetPositionInPixels.x = relativeOffsetInPixels.x + (this._contentSizeInPixels.width - this._rectInPixels.size.width) / 2;
        this._offsetPositionInPixels.y = relativeOffsetInPixels.y + (this._contentSizeInPixels.height - this._rectInPixels.size.height) / 2;

        // rendering using batch node
        if (this._usesBatchNode) {
            // update dirty_, don't update recursiveDirty_
            this._dirty = true;
        } else {
            // self rendering

            // Atlas: Vertex
            var x1 = 0 + this._offsetPositionInPixels.x;
            var y1 = 0 + this._offsetPositionInPixels.y;
            var x2 = x1 + this._rectInPixels.size.width;
            var y2 = y1 + this._rectInPixels.size.height;

            // Don't update Z.
            this._quad.bl.vertices = cc.vertex3(x1, y1, 0);
            this._quad.br.vertices = cc.vertex3(x2, y1, 0);
            this._quad.tl.vertices = cc.vertex3(x1, y2, 0);
            this._quad.tr.vertices = cc.vertex3(x2, y2, 0);
        }
    }