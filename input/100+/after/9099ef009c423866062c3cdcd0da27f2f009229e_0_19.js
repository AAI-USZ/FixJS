function(ctx, state, scene, callback, errback) {
    // NB: state here is a player state, not an element state

    try {

        if (state.happens !== C.PLAYING) return;

        var msec = (Date.now() - state.__startTime);
        var sec = msec / 1000;

        var time = (sec * state.speed) + state.from;
        state.time = time;

        if (state.__rsec === 0) state.__rsec = msec;
        if ((msec - state.__rsec) >= 1000) {
            state.afps = state.__redraws;
            state.__rsec = msec;
            state.__redraws = 0;
        }
        state.__redraws++;

        ctx.clearRect(0, 0, state.width, state.height);

        scene.render(ctx, time, state.zoom);

        // show fps
        if (state.debug) { // TODO: move to player.onrender
            D.drawFPS(ctx, state.afps);
        }

        if (callback) {
            if (!callback(state, time)) return;
        }

        __nextFrame(function() {
           D.drawNext(ctx, state, scene, callback, errback);
        });

    } catch(e) {
        if (!errback) throw e;
        if (errback && errback(e)) throw e;
    }

}