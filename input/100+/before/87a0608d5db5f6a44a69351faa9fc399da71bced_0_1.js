function() {
            forth.terminal.echo('Loading source...');
            try {
                forth.runString(source.val());
                forth.terminal.echo('Source loaded');
            } catch(err) {
                console.log(err);
                forth.terminal.error(err);
            }
        }