function(ctx, x, y) {
            var cameraOffsetX = -this._world._cameraX;
            var cameraOffsetY = -this._world._cameraY;
            ctx.fillStyle = this._ops.color;
            ctx.strokeStyle = this._ops.borderColor;
            ctx.lineWidth = this._ops.borderWidth;
            var i;
            var scale = this._world._scale;
            var collisionOutlines = this._world._ops.collisionOutlines;
            var ox = this._ops.imageOffsetX || 0;
            var oy = this._ops.imageOffsetY || 0;
            ox *= scale;
            oy *= scale;
            if (this._sprite !== undefined) {
                var width;
                var height;
                if (this._ops.shape === "circle" && this._ops.imageStretchToFit) {
                    width = height = this._ops.radius * 2;
                    x -= this._ops.radius / 2 * scale;
                    y -= this._ops.radius / 2 * scale;
                }
                else if (this._ops.imageStretchToFit) {
                    width = this._ops.width;
                    height = this._ops.height;
                }
                else if (this._ops.spriteSheet) {
                    width = this._ops.spriteWidth / 30;
                    height = this._ops.spriteHeight / 30;
                }
                else {
                    width = this._sprite.width / 30;
                    height = this._sprite.height / 30;
                }

                var tx = ox + (x + width / 4 * scale);
                var ty = oy + (y + height / 4 * scale);
                
                ctx.translate(tx, ty);
                
                ctx.rotate(this._body.GetAngle());
                
                if (this._ops.spriteSheet) {
                    ctx.drawImage(this._sprite,
                                  this._ops.spriteX * this._ops.spriteWidth,
                                  this._ops.spriteY * this._ops.spriteHeight,
                                  this._ops.spriteWidth,
                                  this._ops.spriteHeight,
                                  -(width / 2 * scale),
                                  -(height / 2 * scale),
                                  width * scale,
                                  height * scale);
                }
                else {
                    ctx.drawImage(this._sprite,
                                  -(width / 2 * scale),
                                  -(height / 2 * scale),
                                  width * scale,
                                  height * scale);
                }
                              
                ctx.rotate(0 - this._body.GetAngle());              
                              
                ctx.translate(-tx, -ty);

            }

            if (this._sprite && !collisionOutlines) {
                return;
            }

            if (collisionOutlines) {
                if (this._sprite !== undefined) {
                    ctx.fillStyle = "transparent";
                }
                ctx.strokeStyle = "rgb(255, 0, 255)";
                ctx.lineWidth = 2;
            }

            if (this._ops.shape === 'polygon' || this._ops.shape === 'square') {
                var poly = this._body.GetFixtureList().GetShape();
                var vertexCount = parseInt(poly.GetVertexCount(), 10);
                var localVertices = poly.GetVertices();
                var vertices = new Vector(vertexCount);
                var xf = this._body.m_xf;
                for (i = 0; i < vertexCount; ++i) {
                   vertices[i] = b2Math.MulX(xf, localVertices[i]);
                }
                ctx.beginPath();
                ctx.moveTo((cameraOffsetX + vertices[0].x) * scale, (cameraOffsetY + vertices[0].y) * scale);
                for (i = 1; i < vertices.length; i++) {
                    ctx.lineTo((cameraOffsetX + vertices[i].x) * scale, (cameraOffsetY + vertices[i].y) * scale);
                }
                ctx.closePath();
                if (this._ops.borderWidth !== 0 || collisionOutlines) {
                    ctx.stroke();
                }
                ctx.fill();
            }
            else if (this._ops.shape === 'circle') {
                var p = this.position();
                ctx.beginPath();
                ctx.arc((cameraOffsetX + p.x) * scale,
                        (cameraOffsetY + p.y) * scale,
                        this._ops.radius * scale,
                        0,
                        Math.PI * 2, true);
                ctx.closePath();
                if (this._ops.borderWidth !== 0 || collisionOutlines) {
                    ctx.stroke();
                }
                ctx.fill();
            }
        }