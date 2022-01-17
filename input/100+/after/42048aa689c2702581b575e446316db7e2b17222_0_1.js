function(event) {
        var State = event.state;
        if (!State) { return; }
        if (!State.mode) { return; }
        switch (State.mode) {
        case 'Playing':
            GameMode.Playing.switchLevel(LEVELS[State.level]);
            GameMode.Playing.switchAltitude(LEVELS[State.altitude]);
            GameMode.switchTo(GameMode.Playing);
            break;
        case 'Menu':
            GameMode.Menu.switchLevel(LEVELS[State.level]);
            GameMode.switchTo(GameMode.Menu);
            break;
        }
    }