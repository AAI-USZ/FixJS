function(goInside) {
        try {
                forth.step(goInside);
        } catch(err) {
            terminal.error(err);
        }
        forth.redrawDebugger();
        forth.redrawStack();
    }