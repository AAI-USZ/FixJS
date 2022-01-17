function(evt, node) {
            var name = node && domAttr.get(node, 'data-tool');

            this._invokeByName(name);
        }