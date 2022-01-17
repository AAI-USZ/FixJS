function (message) {
        // try to decode json (I assume that each message from server is json)
        try {
            var json = JSON.parse(message.data);
        } catch (e) {
            console.log('This doesn\'t look like a valid JSON: ', message.data);
            return;
        }
        // handle incoming message
        
        if (json.type === 'connectsuccess') {
            // Grab my id
            myId = json.yourid;
            
            // Setup board
            board = json.board;
            grid_canvas.width = board.width;
            grid_canvas.height = board.height;
            grid.clearRect(0, 0, board.width, board.height);
            grid.fillStyle = board['background-color'];
            grid.fillRect(0, 0, board.width, board.height);
            status.text('Board initialized');
        } else if (json.type === 'update') {
            // Add players
            grid.clearRect(0, 0, board.width, board.height);  
            $("#score").find("tr").remove();   
            players = new Object();
            for (var playerid in json.players) {
                var position = json.players[playerid].position;
                players[playerid] = json.players[playerid];
                updatePlayerPosition(playerid, position.x, position.y, position.o);
            }
            for (var playerid in json.players) {
                var id = json.players[playerid].id;
                if( id === myId) {
                    $('#score').append('<tr><td><font color="' + players[id].color + '">You</font></td><td>' + players[id].score + '</td></tr>');
                }
            }
            //json.players.sort(sortPlayers);
            for (var playerid in json.players) {
                var id = json.players[playerid].id;
                if( id !== myId) {
                    $('#score').append('<tr><td><font color="' + players[id].color + '">player</font></td><td>' + players[id].score + '</td></tr>');
                }
            }
            bullets = new Object();
            for (var bulletid in json.bullets) {
                var position = json.bullets[bulletid].position;
                updateBulletPosition(position.x, position.y);
            }
            status.text('Have fun!');
            started = true;
        } else if (json.type === 'messages') { // entire message history
            // insert every single message to the chat window
            for (var i=0; i < json.data.length; i++) {
                addMessage(json.data[i].author, json.data[i].text, new Date(json.data[i].time));
            }
        } else if (json.type === 'message') { // it's a single message
            input.removeAttr('disabled'); // let the user write another message
            addMessage(json.data.author, json.data.text, new Date(json.data.time));
        }
    }