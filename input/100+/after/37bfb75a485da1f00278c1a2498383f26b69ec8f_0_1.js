function() {
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
                    }