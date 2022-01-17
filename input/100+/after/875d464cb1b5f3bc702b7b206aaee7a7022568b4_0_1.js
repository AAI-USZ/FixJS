function() {
            var that = this,
                gameServer = $.connection.gameServer;

            gameServer.initializeMap = function(data) {
                that.map.fill(data);
            };

            gameServer.initializePlayer = function(player) {
                var bomber = new window.Game.Bomber();
                that.playerIndex = player.Index;
                that.players[player.Index] = bomber;
                bomber.moveTo(player.X, player.Y);
                that.addSprite(bomber);
                
                
                // Create a ghost
                var ghost = new window.Game.Bomber(false);
                that.ghost = ghost;
                ghost.moveTo(player.X, player.Y);
                that.addSprite(ghost);
            };

            gameServer.initialize = function(players) {
                for(var i = 0; i < players.length; ++i) {
                    var player = players[i];
                    if(that.players[player.Index]) {
                        continue;
                    }

                    var bomber = new window.Game.Bomber(false);
                    that.players[player.Index] = bomber;
                    bomber.moveTo(players[i].X, players[i].Y);
                    that.addSprite(bomber);
                }
            };

            gameServer.updatePlayerState = function(player) {
                if(that.ghost) {
                    that.ghost.moveExact(that, player.ExactX, player.ExactY);
                }
            };

            $.connection.hub.logging = true;
            // $.connection.hub.url = 'http://localhost:8081/signalr';
            $.connection.hub.start();
        }