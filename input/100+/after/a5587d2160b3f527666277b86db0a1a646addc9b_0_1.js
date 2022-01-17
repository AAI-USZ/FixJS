function(){
                    /*TODO: prüfe welche objekte gelöscht werden müssen*/
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
                    for(var i = bomb.x; i >= bomb.x-bombRadius; i--) {
                        var currField = field.getNode(i,bomb.y);
                        if(currField ) {
                            if( currField.containedEntity) {
                                if(currField.containedEntity.type == 'player')
                                    died_players.push(currField.containedEntity);
                                else
                                    objects.push(currField.containedEntity);
                                currField.containedEntity = null;
                                break;
                            }
                        } else
                            break;
                    }
                    for(var i = bomb.x; i <= bomb.x+bombRadius; i++) {
                        var currField = field.getNode(i,bomb.y);
                        if(currField ) {
                            if (currField.containedEntity) {
                                if(currField.containedEntity.type == 'player')
                                    died_players.push(currField.containedEntity);
                                else
                                    objects.push(currField.containedEntity);
                                currField.containedEntity = null;
                                break;
                            }
                        } else
                            break;
                    }
                    for(var j = bomb.y; j >= bomb.y-bombRadius; j--) {
                        var currField = field.getNode(bomb.x,j);
                        if(currField) {
                            if (currField.containedEntity) {
                                if(currField.containedEntity.type == 'player')
                                    died_players.push(currField.containedEntity);
                                else
                                    objects.push(currField.containedEntity);
                                currField.containedEntity = null;
                                break;
                            }
                        } else
                            break;
                    }
                    for(var j = bomb.y; j <= bomb.y+bombRadius; j++) {
                        var currField = field.getNode(bomb.x,j);
                        if(currField) {
                            if(currField.containedEntity) {
                                if(currField.containedEntity.type == 'player')
                                    died_players.push(currField.containedEntity);
                                else
                                    objects.push(currField.containedEntity);
                                currField.containedEntity = null;
                                break;
                            }
                        } else
                            break;
                    }

                    player.currentBombCount--;
                    broadCast('bomb_explode',{bomb:bomb});
                    broadCast('players_died',{players:died_players});
                    broadCast('delete_entities',{delete_array:objects});
                }