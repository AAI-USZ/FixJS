function(item) {
            var node = domConstruct.toDom(this.itemTemplate.apply(item, item.source));

            item.domNode = node;

            domClass.add(node, 'on-' + item.side);

            this._applyItemStateToDom(item);

            domConstruct.place(node, this.containerNode || this.domNode);

            return node;
        }