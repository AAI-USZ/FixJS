function(str, terminal) {
            try {
                if (forth.dbg.enabled) {
                    forth.feedString(str);
                    terminal.echo('Input loaded into debugger');
                } else
                    forth.runString(str);
            } catch(err) {
                terminal.error(err);
            }
            forth.dbg.redraw();
            forth.redrawStack();
        }