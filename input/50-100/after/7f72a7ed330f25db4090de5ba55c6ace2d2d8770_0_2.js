function() {
            var enabled = forth.dbg.elt('mode').attr('checked') == 'checked';
            forth.dbg.enabled = enabled;
            forth.dbg.redraw();
            forth.terminal.echo('Debugger is ' +
                                (enabled ? 'enabled' : 'disabled'));
            forth.terminal.set_prompt(enabled ? 'debug> ' : '> ');
        }