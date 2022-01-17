function(evt, node) {
            var name = typeof evt === 'string'
                    ? evt
                    : node && domAttr.get(node, 'data-command'),
                command = this._commandsByName[name];

            this._invokeCommand(command);
        }