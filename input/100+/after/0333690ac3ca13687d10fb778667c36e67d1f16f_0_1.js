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
                };

            $('#debug').html('source=' + JSON.stringify(sourceRect));
            $('#debug').append(sourceRect);
            $('#debug').append('<br/>');
            $('#debug').append('exactX=' + (this.exactX / POWER) + ', exactY=' + (this.exactY / POWER));
            $('#debug').append('<br/>');

            for(var i = 0; i < targets.length; ++i) { 
                var tx = targets[i].x,
                    ty = targets[i].y,
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
                    var diffX = (this.x * POWER) - this.exactX,
                        diffY = (this.y * POWER) - this.exactY;

                    this.exactX = this.x * POWER;
                    this.exactY = this.y * POWER;

                    $('#debug').append('collision=(' + (actualX + tx) + ', ' + (actualY + ty) +')');
                    $('#debug').append('<br/>');
                    $('#debug').append('movable=' + movable);
                    $('#debug').append('<br/>');
                    $('#debug').append('intersects=' + intersects);
                    $('#debug').append('<br/>');
                    $('#debug').append('diffX=' + diffX + ', diffY=' + diffY);
                    $('#debug').append('<br/>');
                    return;
                }
            }

            this.x = actualX;
            this.y = actualY;

            this.exactX = x;
            this.exactY = y;
        }