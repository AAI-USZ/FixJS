function(message) {
        if (message.type === 'utf8') {
            var json = JSON.parse(message.utf8Data);
            if(json.type === "move") {
                var player = _getPlayerByID(json.id);
                if(player) {
                    var newX = json["new-pos"].x
                    var newY = json["new-pos"].y
                    if(_isValidMove(player, newX, newY)) {
                        player.position.x = newX;
                        player.position.y = newY;
                    }
                    player.position.o = json["new-pos"].o;
                }
            }
            else if(json.type === "fire") {
                var player = _getPlayerByID(json.id);
                if(player) {
                    var posX = player.position.x;
                    var posY = player.position.y;
                    var o = player.position.o;

                    nextBulletId++;
                    var bullet = new Bullet(nextBulletId, player.id, {"x" : posX, "y" : posY});
                    bullet.index = boardState.bullets.push(bullet) - 1;
                    var timer = setInterval(function() {
                        if(o === "L") {
                            bullet.position.x = bullet.position.x - moveIncrement;
                        }
                        else if(o === "R") {
                            bullet.position.x = bullet.position.x + moveIncrement;
                        }
                        else if(o === "U") {
                            bullet.position.y = bullet.position.y - moveIncrement;
                        }
                        else if(o === "D") {
                            bullet.position.y = bullet.position.y + moveIncrement;
                        }
                        if (_isBulletOutOfBounds(bullet) || _isBulletHitSomeone(bullet)) {
                            clearInterval(timer);
                            timer = null;
                            for(var i = 1; i < boardState.bullets.length; ++i) {
                                var theBullet = boardState.bullets[i];
                                if(theBullet.id === bullet.id) {
                                    boardState.bullets.splice(i, 1);
                                }
                            }
                            bullet = null;
                        }
                        _updateClients();
                    }, 75);
                }
            }
            _updateClients();
        }
    }