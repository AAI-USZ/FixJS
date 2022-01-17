function(object, importer, callback) {
    var player = this;

    player._checkMode();

    player._reset();

    var whenDone = function() {
        player.fire(C.S_LOAD);
        player.stop();
        if (callback) callback();
    };

    // TODO: configure canvas using clips bounds
    
    if (object) {

        // FIXME: load canvas parameters from canvas element, 
        //        if they are not specified
        if (__builder(object)) {  // Builder instance
            if (!player.__canvasPrepared) {
                player._prepareCanvas(Player.DEFAULT_CANVAS);
            }
            L.loadBuilder(player, object, whenDone);
        } else if (object instanceof Scene) { // Scene instance
            if (!player.__canvasPrepared) {
                player._prepareCanvas(Player.DEFAULT_CANVAS);
            }
            L.loadScene(player, object, whenDone);
        } else if (__array(object)) { // array of clips
            if (!player.__canvasPrepared) {
                player._prepareCanvas(Player.DEFAULT_CANVAS);
            }
            L.loadClips(player, object, whenDone);
        } else if (typeof object === 'string') { // URL
            L.loadFromUrl(player, object, importer, whenDone);
        } else { // any object with importer
            L.loadFromObj(player, object, importer, whenDone);
        }

    } else {
        if (!player.__canvasPrepared) {
            player._prepareCanvas(Player.DEFAULT_CANVAS);
        }
        player.anim = new Scene();
    }

    //console.log('load', player.id, player.state);

    return player;
}