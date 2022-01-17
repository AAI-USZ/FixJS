function(ui_handler, renderer) 

{    

    // Server state

    this.id = -1;

    this.player_limit = 4;

    this.players = {};

    

    this.board = new Board(10, 48, global.board.width-20, global.board.height-58);

    

    // Client state

    this.local_player_id = -1;

    this.last_mouse_pt = null;

    this.round_started = false;

    

    // UI Handler

    this.ui = ui_handler;

    this.ui.bind_game(this);

    

    // Renderer

    this.render = renderer;

    this.render.bind_game(this);

    this.frame_timeout = null;

    

    // Audio

    // It's a little awkward to put these here, but I don't care to abstract it any further just yet

    this.claimSnd = document.getElementById('claimSnd');

    this.pushSnd = document.getElementById('pushSnd');

    this.stealSnd = document.getElementById('stealSnd');

    

    // Socket connection

    var game = this;

    

    this.socket = io.connect(); 

    this.socket.on('connect', function() {

        game.ui.on_connected();

    });

    this.socket.on('message', function(packet){

        var data = JSON.parse(packet); 

        console.log(data.type + ', ' + data.player + ': ');

        console.log(data.data);

        game.on_message(data.type, data.data, data.player);

    });

}