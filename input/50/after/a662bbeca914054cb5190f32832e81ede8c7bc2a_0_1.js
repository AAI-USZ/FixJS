function(evt, node) {
            var name = typeof evt === 'string'
                    ? evt
                    : node && domAttr.get(node, 'data-command'),
                command = this._commandsByName[name];
            if (command) this._invokeCommand(command);
        }