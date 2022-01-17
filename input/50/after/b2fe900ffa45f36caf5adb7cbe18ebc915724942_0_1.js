function(str, terminal, stack) {
            try {
                var words = forth.parse(str);
                forth.execute(words);
            } catch(err) {
                terminal.error(err);
            }
            forth.redrawStack();
        }