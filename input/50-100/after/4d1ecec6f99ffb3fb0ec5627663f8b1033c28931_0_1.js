function() {
            var index = ++this.currentIndex,
                item = this._getCompositeValues();

            this.currentValue[index] = item;

            var itemNode = domConstruct.place(this.collectionRowTemplate.apply(item, this), this.collectionNode, 'last');

            this.onAdd(item, itemNode, index);

            if (this.clearOnAdd)
                _CompositeMixin.prototype.clearValue.call(this);

            domClass.add(this.domNode, 'has-items');
        }