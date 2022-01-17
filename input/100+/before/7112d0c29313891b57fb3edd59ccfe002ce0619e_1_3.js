function(){
                    var bombIndex = -1;
                    for (var searchIndex = 0; i < bombs.length; searchIndex++) {
                        if(bombs[searchIndex].id == bomb.id){
                            bombIndex = searchIndex;
                            break;
                        }
                    }
                    if(bombIndex > -1)
                        utils.remove(bombs,bombIndex);

                    var objects = [];
                    var died_players = [];
                    var powerups = [];
                    var droprate = 1;

                    function blastTo(xDir, yDir) {
                        var currField = field.getNode(xDir, yDir);
                        if(currField) {
                            if (currField.containedEntity) {
                                if(currField.containedEntity.type == 'player') {
                                    died_players.push(currField.containedEntity);
                                    currField.containedEntity = null;
                                }
                                else {
                                    var currEntity = currField.containedEntity;
                                    currField.containedEntity = null;
                                    if(currEntity.type === 'obstacle' && Math.random() <= droprate) {
                                        var powerup;
                                        if(Math.random() <= 0.5)
                                            powerup = entityFactory.entity(xDir, yDir, -1, 'powerup_bomb');
                                        else
                                            powerup = entityFactory.entity(xDir, yDir, -1, 'powerup_fire');
                                        powerups.push(powerup);
                                        currField.containedEntity = powerup;
                                    }
                                    objects.push(currEntity);
                                }
                                return false;
                            }
                            else
                                return true;
                        } else
                            return false;
                    }

                    field.getNode(bomb.x, bomb.y).containedEntity = null;
                    for(var i = bomb.x; i >= bomb.x-player.blastRadius; i--) {
                        if(!blastTo(i, bomb.y))
                            break;
                    }
                    for(var i = bomb.x; i <= bomb.x+player.blastRadius; i++) {
                        if(!blastTo(i, bomb.y))
                            break;
                    }
                    for(var j = bomb.y; j >= bomb.y-player.blastRadius; j--) {
                        if(!blastTo(bomb.x, j))
                            break;
                    }
                    for(var j = bomb.y; j <= bomb.y+player.blastRadius; j++) {
                        if(!blastTo(bomb.x, j))
                            break;
                    }

                    player.currentBombCount--;
                    broadCast('bomb_explode',{bomb:bomb});
                    if(died_players.length > 0)
                        broadCast('players_died',{players:died_players});
                    broadCast('delete_entities',{delete_array:objects});
                    broadCast('powerups', {powerups:powerups});
                }