function() {
            var count = {left: 0, right: 0};

            for (var name in this._items)
            {
                var item = this._items[name];

                this._update(item);

                if (item.visible) count[item.side] += 1;

                this._sync(item);
            }

            domAttr.set(this.domNode, 'data-item-count', Math.max(count['left'], count['right']));
        }