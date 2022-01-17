function(from, speed) {

    if (this.state.happens === C.PLAYING) return;

    var player = this;

    player._ensureAnim();
    player._ensureState();

    var _state = player.state;

    _state.from = from || _state.from;
    _state.speed = speed || _state.speed;

    _state.__startTime = Date.now();
    _state.__redraws = 0;
    _state.__rsec = 0;

    /*if (_state.state.__drawInterval !== null) {
        clearInterval(player.state.__drawInterval);
    }*/

    _state.happens = C.PLAYING;

    var scene = player.anim;
    scene.reset();

    D.drawNext(player.ctx, _state, scene,
               function(state, time) {
                   if (time > (state.duration + Player.PEFF)) {
                       state.time = 0;
                       scene.reset();
                       player.pause();
                       // TODO: support looping?
                       return false;
                   }
                   if (player.controls) {
                       player.controls.render(state, time);
                   }
                   return true;
               }, function(err) {
                    player._fireError(err);
               });

    player.fire(C.S_PLAY,_state.from);

    return player;
}