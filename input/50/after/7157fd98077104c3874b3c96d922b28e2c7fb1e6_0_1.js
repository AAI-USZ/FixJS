function(goInside) {
        try {
            forth.step(goInside);
        } catch(err) {
            forth.terminal.error(err);
        }
        forth.dbg.redraw();
        forth.redrawStack();
    }