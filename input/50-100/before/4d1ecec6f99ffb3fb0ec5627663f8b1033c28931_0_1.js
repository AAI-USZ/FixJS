function() {
            var index = ++this.currentIndex,
                item = this._getCompositeValues();

            this.currentValue[index] = item;

            domConstruct.place(this.collectionRowTemplate.apply(item, this), this.collectionNode, 'last');

            domClass.add(this.domNode, 'has-items');
        }