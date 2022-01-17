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
                possible = [];

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

                    window.Game.Logger.log('collision=(' + targetX + ', ' + targetY +')');
                }
                else {
                    possible.push({ x: targetX, y: targetY });
                }
            }

            if(collisions.length == 0) {
                if(window.Game.MoveSprites) {
                    this.x = actualX;
                    this.y = actualY;

                    this.exactX = x;
                    this.exactY = y;
                }

                this.candidate = null;
            } 
            else {
                var candidates = [],
                    candidate,
                    p1 = { x: actualX + this.directionX, y: actualY },
                    p2 = { x: actualX, y: actualY + this.directionY };

                for(var i = 0; i < possible.length; ++i) { 
                    if(possible[i].x === p1.x && possible[i].y === p1.y) {
                        candidates.push({ directionX: this.directionX, 
                                          directionY: 0, 
                                          x: possible[i].x,
                                          y: possible[i].y });
                    }
                    
                    if(possible[i].x === p2.x && possible[i].y === p2.y) {
                        candidates.push({ directionX: 0, 
                                          directionY: this.directionY,
                                          x: possible[i].x,
                                          y: possible[i].y });
                    }
                }

                if(candidates.length == 1) {
                    candidate = candidates[0];
                }
                else if(candidates.length == 2) {
                    var minDistance;
                    for(var i = 0; i < candidates.length; ++i) { 
                        var targetCandidate = candidates[i],
                            xs = (this.exactX - candidates[i].x * POWER),
                            ys = (this.exactY - candidates[i].y * POWER)
                            distance = xs * xs + ys * ys;

                        if(!minDistance || distance < minDistance) {
                            minDistance = distance;
                            candidate = targetCandidate;
                        }
                    }
                }

                if(candidate) {
                    window.Game.Logger.log('candidate=(' + candidate.x + ', ' + candidate.y +')');
                    window.Game.Logger.log('candidate dir=(' + candidate.directionX + ', ' + candidate.directionY +')');

                    if(window.Game.MoveSprites) {
                        if(candidates.directionX === -1) {
                            this.direction = window.Game.Direction.WEST;
                        }
                        else if(candidate.directionX === 1) {
                            this.direction = window.Game.Direction.EAST;
                        }

                        if(candidate.directionY === -1) {
                            this.direction = window.Game.Direction.NORTH;
                        }
                        else if(candidate.directionY === 1) {
                            this.direction = window.Game.Direction.SOUTH;
                        }

                        this.exactX += DELTA * candidate.directionX;
                        this.x = actualX;

                        this.exactY += DELTA * candidate.directionY;
                        this.y = actualY;
                    }

                    this.candidate = candidate;
                }
                else {
                    this.candidate = null;
                }
            }
        }