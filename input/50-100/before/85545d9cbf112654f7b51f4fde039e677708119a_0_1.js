function() {
            var enabled = forth.dbg.elt('mode').attr('checked') == 'checked';
            forth.dbg.enabled = enabled;
            forth.redrawDebugger();
            forth.terminal.echo('Debugger is ' +
                                (enabled ? 'enabled' : 'disabled'));
        }