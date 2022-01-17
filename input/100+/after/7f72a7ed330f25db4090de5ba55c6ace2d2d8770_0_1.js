function() {
            forth.terminal.echo('Loading source...');
            try {
                if (forth.dbg.enabled) {
                    forth.feedString(source.val());
                    forth.terminal.echo('Source loaded into debugger');
                } else {
                    forth.runString(source.val());
                    forth.terminal.echo('Source loaded');
                }
                forth.dbg.redraw();
                forth.redrawStack();
            } catch(err) {
                console.log(err);
                forth.terminal.error(err);
            }
        }