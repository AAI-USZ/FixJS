function(item) {
            var node = domConstruct.toDom(this.itemTemplate.apply(item, item.source));

            item.domNode = node;

            domClass.add(node, 'on-' + item.side);

            this._sync(item);

            domConstruct.place(node, this.domNode);

            return node;
        }