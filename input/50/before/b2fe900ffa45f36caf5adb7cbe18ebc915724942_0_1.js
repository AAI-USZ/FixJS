function(str, terminal, stack) {
            try {
                var words = forth.parse(str);
                forth.execute(words);
                forth.redrawStack();
            } catch(err) {
                terminal.error(err);
            }
        }