function(e) {
        if(e.keyCode === window.Game.Keys.D) {
            window.Game.Debugging = !window.Game.Debugging;
        }
        else if(engine.onKeydown(e)) {
            e.preventDefault();
            return false;
        }
    }