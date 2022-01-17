function runTo(xDir, yDir, data) {
                var player = players[data['id']];
                function movePlayer(xDir, yDir) {
                    if(field.getNode(player.x,player.y).containedEntity && field.getNode(player.x,player.y).containedEntity.type != 'bomb')
                        field.getNode(player.x,player.y).containedEntity = null;
                    player.x += xDir;
                    player.y += yDir;
                    field.getNode(player.x,player.y).containedEntity = player;
                    broadCast('update',{entity:player});
                }
                var currentField = field.getNode(player.x + xDir,player.y + yDir);
                if(currentField)
                    if(!currentField.containedEntity) {
                        movePlayer(xDir, yDir);
                    }
                    else if(currentField.containedEntity.type.indexOf('power') == 0) {
                        if(currentField.containedEntity.type === 'powerup_bomb' && player.maxBombCount < finalBombCount)
                            player.maxBombCount++;
                        else if(currentField.containedEntity.type === 'powerup_fire' && player.blastRadius < finalBlastRadius)
                            player.blastRadius++;

                        broadCast('delete_entities', {delete_array:[currentField.containedEntity]});
                        movePlayer(xDir, yDir);
                    }
            }