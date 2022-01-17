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
            players = new Object();
            for (var i=0; i < json.players.length; i++) {
                var id = json.players[i].id;
                var position = json.players[i].position;
                players[id] = json.players[i];
                updatePlayerPosition(id, position.x, position.y);
            }
            status.text('Players initialized');
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