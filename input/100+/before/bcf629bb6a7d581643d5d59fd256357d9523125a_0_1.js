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
            
            /*
            // set the scene size
            var WIDTH = 400,
                HEIGHT = 300;

            // set some camera attributes
            var VIEW_ANGLE = 45,
                ASPECT = WIDTH / HEIGHT,
                NEAR = 0.1,
                FAR = 10000;

            // get the DOM element to attach to
            // - assume we've got jQuery to hand
            var $container = $('#game');

            // create a WebGL renderer, camera
            // and a scene
            var renderer = new THREE.WebGLRenderer();
            var camera = new THREE.PerspectiveCamera(
                               VIEW_ANGLE,
                               ASPECT,
                               NEAR,
                               FAR );

            var scene = new THREE.Scene();

            // the camera starts at 0,0,0 so pull it back
            camera.position.z = 300;

            // start the renderer
            renderer.setSize(WIDTH, HEIGHT);

            // attach the render-supplied DOM element
            $container.append(renderer.domElement); */
        } else if (json.type === 'update') {
            // Add players
            players = json.players;
            for (var i=0; i < players.length; i++) {
                if (players[i].id == myId) {
                    myColor = players[i].color;
                }
                grid.fillStyle = players[i].color;
                var position = players[i].position;
                grid.fillRect(position.x-(squareSize/2),position.y-(squareSize/2),squareSize,squareSize);
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