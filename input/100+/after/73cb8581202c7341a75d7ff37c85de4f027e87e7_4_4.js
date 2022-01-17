function () {
        if (this._reorderChildDirty) {
            var j;
            var tempItem = null;
            for (var i = 1; i < this._children.length; i++) {
                tempItem = this._children[i];
                j = i - 1;

                //continue moving element downwards while zOrder is smaller or when zOrder is the same but orderOfArrival is smaller
                while (j >= 0 && ( tempItem.getZOrder() < this._children[j].getZOrder() || ( tempItem.getZOrder() == this._children[j].getZOrder()
                    && tempItem.getOrderOfArrival() < this._children[j].getOrderOfArrival() ) )) {
                    this._children[j + 1] = this._children[j];
                    j = j - 1;
                }

                this._children[j + 1] = tempItem;
            }

            if (this._batchNode) {
                this._arrayMakeObjectsPerformSelector(this._children, cc.Node.StateCallbackType.sortAllChildren);
            }
            this._reorderChildDirty = false;
        }
    }