function(game, x, y) {
            this.effectiveX = x / POWER;
            this.effectiveY = y / POWER;

            var actualX = Math.floor((x + (POWER / 2)) / POWER),
                actualY = Math.floor((y + (POWER / 2)) / POWER),
                targets = this.getHitTargets(),
                sourceLeft = this.effectiveX * game.map.tileSize,
                sourceTop = this.effectiveY * game.map.tileSize,
                sourceRect = {
                    left: sourceLeft,
                    top: sourceTop,
                    right: sourceLeft + game.map.tileSize,
                    bottom : sourceTop + game.map.tileSize
                },
                collisions = [],
                possible = [],
                handled = false;

            window.Game.Logger.clear();
            window.Game.Logger.log('source=' + JSON.stringify(sourceRect));
            window.Game.Logger.log('exactX=' + (this.exactX / POWER) + ', exactY=' + (this.exactY / POWER));
            window.Game.Logger.log('actualX=' + actualX + ', actualY=' + actualY);
            window.Game.Logger.log('directionX=' + this.directionX + ', directionY=' + this.directionY);

            for(var i = 0; i < targets.length; ++i) { 
                var tx = targets[i].x,
                    ty = targets[i].y,
                    targetX = actualX + tx,
                    targetY = actualY + ty,
                    left = (actualX + tx) * game.map.tileSize,
                    top = (actualY + ty) * game.map.tileSize,
                    targetRect = {
                        left: left,
                        top: top,
                        right: left + game.map.tileSize,
                        bottom: top + game.map.tileSize
                    },
                    movable = game.movable(Math.floor(left / game.map.tileSize), 
                                           Math.floor(top / game.map.tileSize)),
                    intersects = window.Game.Utils.intersects(sourceRect, targetRect);

                if(!movable && intersects) {
                    collisions.push({ x: targetX, y: targetY });

                    window.Game.Logger.log('collision=(' + (actualX + tx) + ', ' + (actualY + ty) +')');
                }
                else {
                    possible.push({ x: targetX, y: targetY });
                }
            }

            switch(collisions.length) {
                case 0:
                this.x = actualX;
                this.y = actualY;

                this.exactX = x;
                this.exactY = y;
                break;
                case 1:
                    var diffY = (collisions[0].y * POWER - this.exactY),
                        diffX = (collisions[0].x * POWER - this.exactX),
                        absX = Math.abs(diffX),
                        absY = Math.abs(diffY);

                    if(absY >= 35 && absY < 100) {
                        this.exactY += DELTA * -window.Game.Utils.sign(diffY);
                        handled = true;
                    }

                    if(absX >= 35  && absX < 100) {
                        this.exactX += DELTA * -window.Game.Utils.sign(diffX);
                        handled = true;
                    }

                    window.Game.Logger.log('diffX=(' + absX +', diffY=' + absY + ')');
                break;
            }

            if(!handled && collisions.length > 0) {
                var candidate,
                    p1 = { x: actualX + this.directionX, y: actualY },
                    p2 = { x: actualX, y: actualY + this.directionY };

                for(var i = 0; i < possible.length; ++i) { 
                    if(possible[i].x === p1.x && possible[i].y === p1.y) {
                        // window.Game.Logger.log('p['+ i + ']=(' + possible[i].x +', ' + possible[i].y + ')');
                        candidate = { x: this.directionX, y: 0 };
                    }
                    
                    if(possible[i].x === p2.x && possible[i].y === p2.y) {
                        candidate = { x: 0, y: this.directionY };
                    }

                    if(candidate) {
                        this.exactX += DELTA * candidate.x;
                        this.exactY += DELTA * candidate.y;

                        this.x = actualX;
                        this.y = actualY;
                        break;
                    }
                }
            }
        }