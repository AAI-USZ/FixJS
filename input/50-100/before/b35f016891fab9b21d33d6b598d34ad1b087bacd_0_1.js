function(private_gameid) {
    this.id = Game.new_id();
    this.private_gameid = private_gameid;
    this.player_limit = 8;
    this.time_limit = 60;
    this.tile_recharge = 2.0;
    this.readyTimeout = null;
    this.round_timeout = null;
    this.round_started = false;
    
    this.board = new board.Board();
    
    this.players = [];
    this.trails = [];
}