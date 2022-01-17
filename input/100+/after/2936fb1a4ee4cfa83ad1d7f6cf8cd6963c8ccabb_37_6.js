function () {
        cc.Assert(this._batchNode, "updateTransform is only valid when cc.Sprite is being rendered using an cc.SpriteBatchNode");

        // recaculate matrix only if it is dirty
        if (this.isDirty()) {

            // If it is not visible, or one of its ancestors is not visible, then do nothing:
            if (!this._isVisible || ( this._parent && this._parent != this._batchNode && this._parent._shouldBeHidden)) {
                this._quad.br.vertices = this._quad.tl.vertices = this._quad.tr.vertices = this._quad.bl.vertices = cc.vertex3(0, 0, 0);
                this._shouldBeHidden = true;
            } else {
                this._shouldBeHidden = false;

                if (!this._parent || this._parent == this._batchNode) {
                    this._transformToBatch = this.nodeToParentTransform();
                } else {
                    cc.Assert(this._parent instanceof cc.Sprite, "Logic error in CCSprite. Parent must be a CCSprite");
                    this._transformToBatch = cc.AffineTransformConcat(this.nodeToParentTransform(), this._parent._transformToBatch);
                }

                //
                // calculate the Quad based on the Affine Matrix
                //
                var size = this._rect.size;

                var x1 = this._offsetPosition.x;
                var y1 = this._offsetPosition.y;

                var x2 = x1 + size.width;
                var y2 = y1 + size.height;
                var x = this._transformToBatch.tx;
                var y = this._transformToBatch.ty;

                var cr = this._transformToBatch.a;
                var sr = this._transformToBatch.b;
                var cr2 = this._transformToBatch.d;
                var sr2 = -this._transformToBatch.c;
                var ax = x1 * cr - y1 * sr2 + x;
                var ay = x1 * sr + y1 * cr2 + y;

                var bx = x2 * cr - y1 * sr2 + x;
                var by = x2 * sr + y1 * cr2 + y;

                var cx = x2 * cr - y2 * sr2 + x;
                var cy = x2 * sr + y2 * cr2 + y;

                var dx = x1 * cr - y2 * sr2 + x;
                var dy = x1 * sr + y2 * cr2 + y;

                this._quad.bl.vertices = cc.vertex3(cc.RENDER_IN_SUBPIXEL(ax), cc.RENDER_IN_SUBPIXEL(ay), this._vertexZ);
                this._quad.br.vertices = cc.vertex3(cc.RENDER_IN_SUBPIXEL(bx), cc.RENDER_IN_SUBPIXEL(by), this._vertexZ);
                this._quad.tl.vertices = cc.vertex3(cc.RENDER_IN_SUBPIXEL(dx), cc.RENDER_IN_SUBPIXEL(dy), this._vertexZ);
                this._quad.tr.vertices = cc.vertex3(cc.RENDER_IN_SUBPIXEL(cx), cc.RENDER_IN_SUBPIXEL(cy), this._vertexZ);
            }

            this._textureAtlas.updateQuad(this._quad, this._atlasIndex);
            this._recursiveDirty = false;
            this.setDirty(false);
        }

        // recursively iterate over children
        if (this._hasChildren) {
            this._arrayMakeObjectsPerformSelector(this._children, cc.Node.StateCallbackType.updateTransform);
        }

        if (cc.SPRITE_DEBUG_DRAW) {
            // draw bounding box
            var vertices = [
                new cc.Point(this._quad.bl.vertices.x, this._quad.bl.vertices.y),
                new cc.Point(this._quad.br.vertices.x, this._quad.br.vertices.y),
                new cc.Point(this._quad.tr.vertices.x, this._quad.tr.vertices.y),
                new cc.Point(this._quad.tl.vertices.x, this._quad.tl.vertices.y)
            ];
            cc.drawingUtil.drawPoly(vertices, 4, true);
        }
    }