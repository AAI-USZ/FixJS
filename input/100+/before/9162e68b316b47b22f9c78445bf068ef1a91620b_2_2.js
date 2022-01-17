function(player, scene, callback) {
    if (player.anim) player.anim.dispose();
    // add debug rendering
    if (player.state.debug) scene.visitElems(Element.__addDebugRender);
    // subscribe events
    if (player.mode & C.M_HANDLE_EVENTS) {
        L.subscribeEvents(player.canvas, scene);
    }
    // assign
    player.anim = scene;
    if (!player.state.duration) {
        if (!(player.mode & C.M_DYNAMIC) 
            && (scene.duration === Number.MAX_VALUE)) {
          scene.duration = Scene.DEFAULT_VIDEO_DURATION;
        }
        player.updateDuration(scene.duration);
    }
    if (callback) callback.call(player);
}