function() {
            var count = {left: 0, right: 0},
                items = this._items;

            for (var i = 0; i < items.length; i++)
            {
                var item = items[i];

                this._updateItemState(item);

                if (item.visible) count[item.side] += 1;

                this._applyItemStateToDom(item);
            }

            var size = Math.max(count['left'], count['right']);

            domAttr.set(this.domNode, 'data-item-count', size);

            this._size = size;

            this.onContentChange();
        }