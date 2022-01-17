function(callback) { // TODO: make and event?
    var player = this;

    player.fire(C.S_ERROR);
    //console.log('onerror', player.id, player);

    player.anim = null;
    player.stop();
    // TODO:

    return player;    
}