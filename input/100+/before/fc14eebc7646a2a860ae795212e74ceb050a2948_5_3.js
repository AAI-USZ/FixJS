function(values) {
            var items = {},
                count = {left: 0, right: 0};

            if (typeof values == 'undefined') return;

            this._remove();

            for (var i = 0; i < values.length; i++) {
                var source = values[i],
                    item = {
                        domNode: null,
                        name: source.name || source.id,
                        side: source.side || 'right',
                        busy: false,
                        visible: true,
                        enabled: true,
                        source: source
                    };

                this._update(item);

                if (item.visible) count[item.side] += 1;

                this._render(item);

                items[item.name] = item;
            }

            /* todo: track each side seprately? */
            domAttr.set(this.domNode, 'data-tool-count', Math.max(count['left'], count['right']));

            this._items = items;
        }