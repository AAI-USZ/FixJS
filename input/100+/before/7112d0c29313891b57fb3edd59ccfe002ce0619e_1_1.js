function movePlayer(xDir, yDir) {
                if(field.getNode(player.x,player.y).containedEntity && field.getNode(player.x,player.y).containedEntity.type != 'bomb')
                    field.getNode(player.x,player.y).containedEntity = null;
                player.x += xDir;
                player.y += yDir;
                field.getNode(player.x,player.y).containedEntity = player;
                broadCast('update',{entity:player});
            }