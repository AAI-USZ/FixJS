function(str, terminal) {
            try {
                forth.runString(str);
            } catch(err) {
                terminal.error(err);
            }
            forth.redrawStack();
        }