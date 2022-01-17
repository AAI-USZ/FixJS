function (sprite, pos, gid) {
        var z = pos.x + pos.y * this._layerSize.width;
        sprite.setPosition(this.positionAt(pos));
        sprite.setVertexZ(this._vertexZForPos(pos));
        sprite.setAnchorPoint(cc.PointZero());
        sprite.setOpacity(this._opacity);
        sprite.setTag(z);
        sprite.setFlipX(false);
        sprite.setFlipX(false);
        sprite.setRotation(0);
        sprite.setAnchorPoint(cc.ccp(0,0));

        // Rotation in tiled is achieved using 3 flipped states, flipping across the horizontal, vertical, and diagonal axes of the tiles.
        if ((gid & cc.TMXTileDiagonalFlag)>>>0) {
            // put the anchor in the middle for ease of rotation.
            sprite.setAnchorPoint(cc.ccp(0.5, 0.5));
            sprite.setPosition(cc.ccp(this.positionAt(pos).x + sprite.getContentSize().height / 2,
                this.positionAt(pos).y + sprite.getContentSize().width / 2));

            var flag = ((gid & ((cc.TMXTileHorizontalFlag | cc.TMXTileVerticalFlag) >>> 0)) >>> 0);
            // handle the 4 diagonally flipped states.
            if (flag == cc.TMXTileHorizontalFlag) {
                sprite.setRotation(90);
            }
            else if (flag == cc.TMXTileVerticalFlag) {
                sprite.setRotation(270);
            }
            else if (flag == ((cc.TMXTileVerticalFlag | cc.TMXTileHorizontalFlag) >>> 0)) {
                sprite.setRotation(90);
                sprite.setFlipX(true);
            }
            else {
                sprite.setRotation(270);
                sprite.setFlipX(true);
            }
        }
        else {
            if ((gid & cc.TMXTileHorizontalFlag)>>>0) {
                sprite.setFlipX(true);
            }

            if ((gid & cc.TMXTileVerticalFlag)>>>0) {
                sprite.setFlipY(true);
            }
        }
    }