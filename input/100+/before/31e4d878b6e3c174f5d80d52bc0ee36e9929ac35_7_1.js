function (rect, rotated, untrimmedSize) {
        this._rectRotated = rotated;

        this.setContentSize(untrimmedSize);
        this.setVertexRect(rect);
        this._setTextureCoords(rect);

        var relativeOffset = this._unflippedOffsetPositionFromCenter;

        /* WEBGL Code
         if (this._flipX) {
         //relativeOffset.x = -relativeOffset.x;
         }
         if (this._flipY) {
         //relativeOffset.y = -relativeOffset.y;
         }
         */

        this._offsetPosition.x = relativeOffset.x + (this._contentSize.width - this._rect.size.width) / 2;
        this._offsetPosition.y = relativeOffset.y + (this._contentSize.height - this._rect.size.height) / 2;

        // rendering using batch node
        if (this._batchNode) {
            // update dirty_, don't update recursiveDirty_
            this.setDirty(true);
        } else {
            // self rendering

            // Atlas: Vertex
            var x1 = 0 + this._offsetPosition.x;
            var y1 = 0 + this._offsetPosition.y;
            var x2 = x1 + this._rect.size.width;
            var y2 = y1 + this._rect.size.height;

            // Don't update Z.
            this._quad.bl.vertices = cc.vertex3(x1, y1, 0);
            this._quad.br.vertices = cc.vertex3(x2, y1, 0);
            this._quad.tl.vertices = cc.vertex3(x1, y2, 0);
            this._quad.tr.vertices = cc.vertex3(x2, y2, 0);
        }
    }