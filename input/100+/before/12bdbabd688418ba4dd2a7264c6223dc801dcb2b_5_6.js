function () {
        cc.Assert(this._usesBatchNode, "");

        // optimization. Quick return if not dirty
        if (!this._dirty) {
            return;
        }

        var matrix = new cc.AffineTransform();

        // Optimization: if it is not visible, then do nothing
        if (!this._isVisible) {
            this._quad.br.vertices = this._quad.tl.vertices = this._quad.tr.vertices = this._quad.bl.vertices = cc.vertex3(0, 0, 0);
            this._textureAtlas.updateQuad(this._quad, this._atlasIndex)
            this._dirty = this._recursiveDirty = false;
            return;
        }

        // Optimization: If parent is batchnode, or parent is nil
        // build Affine transform manually
        if (!this._parent || this._parent == this._batchNode) {
            var radians = -cc.DEGREES_TO_RADIANS(this._rotation);
            var c = Math.cos(radians);
            var s = Math.sin(radians);

            matrix = cc.AffineTransformMake(c * this._scaleX, s * this._scaleX, -s * this._scaleY, c * this._scaleY,
                this._position.x, this._position.y);
            if (this._skewX || this._skewY) {
                var skewMatrix = cc.AffineTransformMake(1.0, Math.tan(cc.DEGREES_TO_RADIANS(this._skewY)), Math.tan(cc.DEGREES_TO_RADIANS(this._skewX)), 1.0, 0.0, 0.0);
                matrix = cc.AffineTransformConcat(skewMatrix, matrix);
            }
            matrix = cc.AffineTransformTranslate(matrix, -this._anchorPointInPixels.x, -this._anchorPointInPixels.y);
        } else // parent_ != batchNode_
        {
            // else do affine transformation according to the HonorParentTransform
            matrix = cc.AffineTransformIdentity();
            var prevHonor = cc.HONOR_PARENT_TRANSFORM_ALL;

            for (var p = this; p && p != this._batchNode; p = p.getParent()) {
                // Might happen. Issue #1053
                // how to implement, we can not use dynamic
                // cc.Assert( [p isKindOfClass:[CCSprite class]], @"CCSprite should be a CCSprite subclass. Probably you initialized an sprite with a batchnode, but you didn't add it to the batch node." );

                var tv = new cc.TransformValues();
                p._getTransformValues(tv);

                // If any of the parents are not visible, then don't draw this node
                if (!tv.visible) {
                    this._quad.br.vertices = this._quad.tl.vertices = this._quad.tr.vertices = this._quad.bl.vertices = cc.vertex3(0, 0, 0);
                    this._textureAtlas.updateQuad(this._quad, this._atlasIndex);
                    this._dirty = this._recursiveDirty = false;
                    return;
                }

                var newMatrix = cc.AffineTransformIdentity();

                // 2nd: Translate, Skew, Rotate, Scale
                if (prevHonor & cc.HONOR_PARENT_TRANSFORM_TRANSLATE) {
                    newMatrix = cc.AffineTransformTranslate(newMatrix, tv.pos.x, tv.pos.y);
                }

                if (prevHonor & cc.HONOR_PARENT_TRANSFORM_ROTATE) {
                    newMatrix = cc.AffineTransformRotate(newMatrix, -cc.DEGREES_TO_RADIANS(tv.rotation));
                }

                if (prevHonor & cc.HONOR_PARENT_TRANSFORM_SKEW) {
                    var skew = new cc.AffineTransform();
                    skew = cc.AffineTransformMake(1.0, Math.tan(cc.DEGREES_TO_RADIANS(tv.skew.y)), Math.tan(cc.DEGREES_TO_RADIANS(tv.skew.x)), 1.0, 0.0, 0.0);
                    // apply the skew to the transform
                    newMatrix = cc.AffineTransformConcat(skew, newMatrix);
                }

                if (prevHonor & cc.HONOR_PARENT_TRANSFORM_SCALE) {
                    newMatrix = cc.AffineTransformScale(newMatrix, tv.scale.x, tv.scale.y);
                }

                // 3rd: Translate anchor point
                newMatrix = cc.AffineTransformTranslate(newMatrix, -tv.ap.x, -tv.ap.y);

                // 4th: Matrix multiplication
                matrix = cc.AffineTransformConcat(matrix, newMatrix);

                prevHonor = p;
                this.getHonorParentTransform();
            }
        }

        //
        // calculate the Quad based on the Affine Matrix
        //
        var size = new cc.Size();
        size = this._rectInPixels.size;

        var x1 = this._offsetPositionInPixels.x;
        var y1 = this._offsetPositionInPixels.y;

        var x2 = x1 + size.width;
        var y2 = y1 + size.height;
        var x = matrix.tx;
        var y = matrix.ty;

        var cr = matrix.a;
        var sr = matrix.b;
        var cr2 = matrix.d;
        var sr2 = -matrix.c;
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

        this._textureAtlas.updateQuad(this._quad, this._atlasIndex);
        this._dirty = this._recursiveDirty = false;
    }