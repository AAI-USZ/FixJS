function (ctx) {
        var context = ctx || cc.renderContext;
        // transformations
        if (cc.renderContextType == cc.CANVAS) {
            var pAp;
            if (!this._ignoreAnchorPointForPosition) {
                if (this._parent) {
                    pAp = this._parent._anchorPointInPoints;
                } else {
                    pAp = new cc.Point(0, 0);
                }
                context.translate(0 | (this._position.x - pAp.x), -(0 | (this._position.y - pAp.y)));
            } else {
                if (this._parent) {
                    pAp = this._parent._anchorPointInPoints;
                } else {
                    pAp = new cc.Point(0, 0);
                }
                var lAp = this._anchorPointInPoints;
                context.translate(0 | ( this._position.x - pAp.x + lAp.x), -(0 | (this._position.y - pAp.y + lAp.y)));
            }

            if (this._rotation != 0) {
                context.rotate(cc.DEGREES_TO_RADIANS(this._rotation));
            }
            if ((this._scaleX != 1) || (this._scaleY != 1)) {
                context.scale(this._scaleX, this._scaleY);
            }
            if ((this._skewX != 0) || (this._skewY != 0)) {
                context.transform(1,
                    -Math.tan(cc.DEGREES_TO_RADIANS(this._skewY)),
                    -Math.tan(cc.DEGREES_TO_RADIANS(this._skewX)),
                    1, 0, 0);
            }
        } else {
            //Todo WebGL implement need fixed
            if (cc.NODE_TRANSFORM_USING_AFFINE_MATRIX) {
                // BEGIN alternative -- using cached transform
                //
                if (this._isTransformGLDirty) {
                    var t = this.nodeToParentTransform();
                    //cc.CGAffineToGL(t, this._transformGL);
                    this._isTransformGLDirty = false;
                }
                //glMultMatrixf(this._transformGL);
                if (this._vertexZ) {
                    //glTranslatef(0, 0, this._vertexZ);
                }

                // XXX: Expensive calls. Camera should be integrated into the cached affine matrix
                if (this._camera && !(this._grid && this._grid.isActive())) {
                    var translate = (this._anchorPointInPoints.x != 0.0 || this._anchorPointInPoints.y != 0.0);

                    if (translate) {
                        //cc.glTranslate(RENDER_IN_SUBPIXEL(this._anchorPointInPoints.x), RENDER_IN_SUBPIXEL(this._anchorPointInPoints.y), 0);
                    }
                    this._camera.locate();
                    if (translate) {
                        //cc.glTranslate(RENDER_IN_SUBPIXEL(-this._anchorPointInPoints.x), RENDER_IN_SUBPIXEL(-this._anchorPointInPoints.y), 0);
                    }
                }
                // END alternative
            } else {
                // BEGIN original implementation
                //
                // translate
                if (!this._ignoreAnchorPointForPosition && (this._anchorPointInPoints.x != 0 || this._anchorPointInPoints.y != 0 )) {
                    //cc.glTranslatef(RENDER_IN_SUBPIXEL(-this._anchorPointInPoints.x), RENDER_IN_SUBPIXEL(-this._anchorPointInPoints.y), 0);
                }
                if (this._anchorPointInPoints.x != 0 || this._anchorPointInPoints.y != 0) {
                    //cc.glTranslatef(RENDER_IN_SUBPIXEL(this._position.x + this._anchorPointInPoints.x), RENDER_IN_SUBPIXEL(this._position.y + this._anchorPointInPoints.y), this._vertexZ);
                }
                else if (this._position.x != 0 || this._position.y != 0 || this._vertexZ != 0) {
                    //cc.glTranslatef(RENDER_IN_SUBPIXEL(this._position.x), RENDER_IN_SUBPIXEL(this._position.y), this._vertexZ);
                }
                // rotate
                if (this._rotation != 0.0) {
                    //glRotatef(-this._rotation, 0.0, 0.0, 1.0);
                }

                // skew
                //if ((skewX_ != 0.0) || (skewY_ != 0.0)) {
                //var skewMatrix = new cc.AffineTransform();
                //skewMatrix = cc.AffineTransformMake(1.0, Math.tan(cc.DEGREES_TO_RADIANS(skewY_)), Math.tan(cc.DEGREES_TO_RADIANS(skewX_)), 1.0, 0.0, 0.0);
                //TODO
                // glMatrix = new GLfloat();
                //cc.AffineToGL(skewMatrix, glMatrix);
                //TODO
                // glMultMatrixf(glMatrix);
                // }

                // scale
                if (this._scaleX != 1.0 || this._scaleY != 1.0) {
                    // glScalef(this._scaleX, this._scaleY, 1.0);
                }
                if (this._camera && !(this._grid && this._grid.isActive()))
                    this._camera.locate();

                // restore and re-position point
                if (this._anchorPointInPoints.x != 0.0 || this._anchorPointInPoints.y != 0.0) {
                    // glTranslatef(RENDER_IN_SUBPIXEL(-this._anchorPointInPoints.x), RENDER_IN_SUBPIXEL(-this._anchorPointInPoints.y), 0);
                }
                //
                // END original implementation
            }
        }
    }