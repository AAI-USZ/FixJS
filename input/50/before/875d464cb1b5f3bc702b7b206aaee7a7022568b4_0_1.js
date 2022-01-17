function(player) {
                if(that.ghost) {
                    that.ghost.moveExact(that, player.X * 100, player.Y * 100);
                }
            }