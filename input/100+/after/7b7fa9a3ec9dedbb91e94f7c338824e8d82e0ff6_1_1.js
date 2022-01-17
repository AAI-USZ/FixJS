function(message) {
            // All basic communication messages are handled as JSON objects
            // That includes the request for status of the board.
            var self = this;
            // Handle game status messages
            if(message.type == 'utf8') {      
              // Save stats about the data
              statCollector.passThroughWrite("incoming", message.utf8Data);
              // Decode the json message and take the appropriate action
              var messageObject = JSON.parse(message.utf8Data);
              // Parse the cookie
              var cookie = parseCookie(request.httpRequest.headers['cookie']);
              // Grab the session id
              var sessionId = cookie['connect.sid'];
              
              // If initializing the game
              if(messageObject['type'] == 'initialize') {    
                // Grab the username based on the session id and initialize the board
                state.sessionsCollection.findOne({id:sessionId}, function(err, session) {
                  if(err) throw err;
                  session = typeof session == 'undefined' || session == null ? {} : session;
                  initializeBoard(state, session, self);                      
                })
              } else if(messageObject['type'] == 'dead') {
                updateMongomanDeathStats(state, self, messageObject, sessionId);
                // Kill the board so we can start again
                killBoard(state, self);
              } else if(messageObject['type'] == 'mongowin') {
                // Update mongoman win stats
                updateMongomanWinStats(state, self, messageObject, sessionId);
                // Signal mongoman won
                mongomanWon(state, self);
                // Kill the board so we can start again
                killBoard(state, self);
              } else if(messageObject['type'] == 'ghostdead') {
                // Update player stats
                updateGhostDeadStats(state, self, sessionId);
                // Signal ghost is dead
                ghostDead(state, self, messageObject);
              } else if(messageObject['type'] == 'powerpill') {
                var value = messageObject['value'];
                // Retrieve the board by id from cache
                var boardId = state.boardIdByConnections[self.connectionId];                
                // Retrieve the game stats for the board
                var gameState = state.gameStatesByBoardId[boardId];
                if(gameState == null) {
                  state.gameStatesByBoardId[boardId] = {};
                  gameState = state.gameStatesByBoardId[boardId];
                }                 

                // If we have game stats update them
                if(gameState) {
                  gameState[self.connectionId]['powerpill'] = value;
                }

                var keys = Object.keys(gameState);
                // validate if we have a collision
                for(var i = 0; i < keys.length; i++) {
                  var key = keys[i];
                  
                  // Set all ghosts to alive
                  if(value == false && !gameState[key].mongoman) {
                    gameState[key]['dead'] = false;
                  }
                  
                  // If it's not the originator set the powerpill in play
                  if(key != self.connectionId) {
                    state.connections[key].sendUTF(statCollector.passThroughWrite('powerpill', JSON.stringify({state:'powerpill', value:value})));
                  }
                }                  
              } else if(messageObject['type'] == 'movement') {
                // Unpack object
                var position = messageObject['object'];
                var mongoman = messageObject['mongoman'];

                // Retrieve the board by id from cache
                var boardId = state.boardIdByConnections[self.connectionId];                
                // Get the connectionid list
                var connectionIds = state.connectionsByBoardId[boardId];
                // Retrieve the game stats for the board
                var gameState = state.gameStatesByBoardId[boardId];
                if(gameState == null) {
                  state.gameStatesByBoardId[boardId] = {};
                  gameState = state.gameStatesByBoardId[boardId];
                } 
                
                // Fire the move command to all boards to animate the ghosts
                for(var i = 0; i < connectionIds.length; i++) {
                  // Fire off message to all the other players
                  if(self.connectionId != connectionIds[i]) {
                    var role = mongoman ? "m" : "g";
                    // Mongoman or ghost
                    state.connections[connectionIds[i]].sendUTF(statCollector.passThroughWrite('movement', JSON.stringify({
                        id: self.connectionId, b: boardId,
                        role: role, state: 'n',
                        pos: {
                          x: position.x, y: position.y,
                          accx: position.accx, accy: position.accy,
                          facing: position.facing,
                          xpushing: position.xpushing, ypushing: position.ypushing
                        }
                      })));
                  }
                }
                       
                // If we have game stats update them
                if(gameState) {
                  if(gameState[self.connectionId] == null) {
                    gameState[self.connectionId] = {mongoman: mongoman, pos: position, dead: false, powerpill:false};
                  } else{
                    gameState[self.connectionId] = {mongoman: mongoman, pos: position, dead: gameState[self.connectionId]["dead"], powerpill:gameState[self.connectionId]["powerpill"]};
                  }
                }
                
                // Don't respond if the game is over
                if(gameState[self.connectionId].dead) return;
                // Fetch the power pill state for this connection
                var powerpill = gameState[self.connectionId].powerpill;
                // Iterate over all the users
                var keys = Object.keys(gameState);
                // validate if we have a collision
                for(var i = 0; i < keys.length; i++) {
                  var key = keys[i];
                  
                  if(key != self.connectionId) {
                    // Get the position
                    var _player = gameState[key];
                    var _powerpill = _player.powerpill;
                    var _mongoman = _player.mongoman;
                    var _position = _player.pos;
                    // If we have collision and either the current player or the other player is a ghost
                    if(_position.x < (position.x + 5) && _position.x > (position.x - 5) &&
                      _position.y < (position.y + 5) && _position.y > (position.y - 5) &&
                      (mongoman == true || _mongoman == true)) {                        
                      // Check if we have a powerpill situation and kill ghost if we do
                      if(_powerpill == true || powerpill == true) {
                        // Object to set dead
                        var _setDeadObject = !_mongoman ? _player : gameState[self.connectionId];
                        
                        // Return if this user is dead
                        if(_setDeadObject['dead']) return;
                        // Set player dead
                        _setDeadObject['dead'] = true;

                        // What id to send
                        var _connectionId = !_mongoman ? key : self.connectionId;

                        // Message all players that we are dead
                        for(var j = 0; j < connectionIds.length; j++) {
                          state.connections[connectionIds[j]].sendUTF(statCollector.passThroughWrite('ghostdead', JSON.stringify({state:'ghostdead', id:_connectionId})));
                        }
                        
                        // return;
                      } else {                          
                        // Set all items to dead
                        for(var j = 0; j < keys.length; j++) {
                          gameState[keys[j]].dead = true;
                        }   

                        // Set current connection dead
                        gameState[self.connectionId].dead = true;
                        // Kill the board
                        killBoard(state, self);
                        // Short cut the method
                        return;                       
                      }
                    }                      
                  }
                }                  
              }
            }
          }