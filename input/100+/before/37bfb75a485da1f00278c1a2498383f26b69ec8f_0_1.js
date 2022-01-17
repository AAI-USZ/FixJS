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
                            boardState.bullets.splice(bulletIndex, 1);
                            bullet = null;
                        }
                        _updateClients();
                    }