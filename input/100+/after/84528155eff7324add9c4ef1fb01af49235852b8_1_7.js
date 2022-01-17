function(player, scene, callback) {
    if (player.anim) player.anim.dispose();
    // add debug rendering
    if (player.state.debug
        && !global_opts.liveDebug) 
        scene.visitElems(Element.__addDebugRender);
    // assign
    player.anim = scene;
    // subscribe events
    player._checkMode();
    // update duration
    if (!player.state.duration) {
        if (!(player.mode & C.M_DYNAMIC) 
            && (scene.duration === Number.MAX_VALUE)) {
          scene.duration = Scene.DEFAULT_VIDEO_DURATION;
        }
        player.updateDuration(scene.duration);
    }
    if (callback) callback.call(player);
}