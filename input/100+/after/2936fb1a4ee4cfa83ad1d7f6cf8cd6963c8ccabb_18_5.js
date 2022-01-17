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
            var transfrom4x4;

            // Convert 3x3 into 4x4 matrix
            var tmpAffine = this.nodeToParentTransform();
            //CGAffineToGL(&tmpAffine, transfrom4x4.mat);

            // Update Z vertex manually
            //transfrom4x4.mat[14] = m_fVertexZ;

            //kmGLMultMatrix( &transfrom4x4 );


            // XXX: Expensive calls. Camera should be integrated into the cached affine matrix
            /*if ( m_pCamera != NULL && !(m_pGrid != NULL && m_pGrid->isActive()) ) {
                bool translate = (m_tAnchorPointInPoints.x != 0.0f || m_tAnchorPointInPoints.y != 0.0f);

                if( translate )
                    kmGLTranslatef(RENDER_IN_SUBPIXEL(m_tAnchorPointInPoints.x), RENDER_IN_SUBPIXEL(m_tAnchorPointInPoints.y), 0 );

                m_pCamera->locate();

                if( translate )
                    kmGLTranslatef(RENDER_IN_SUBPIXEL(-m_tAnchorPointInPoints.x), RENDER_IN_SUBPIXEL(-m_tAnchorPointInPoints.y), 0 );
            }*/
        }
    }