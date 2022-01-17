function () {
        if (this._reorderChildDirty) {
            var i = 0, j = 0, length = this._children.length;
            //insertion sort
            for (i = 1; i < length; i++) {
                var tempItem = this._children[i];
                j = i - 1;

                //continue moving element downwards while zOrder is smaller or when zOrder is the same but orderOfArrival is smaller
                while (j >= 0 && (tempItem.getZOrder() < this._children[j].getZOrder() ||
                    (tempItem.getZOrder() == this._children[j].getZOrder() && tempItem.getOrderOfArrival() < this._children[j].getOrderOfArrival()))) {
                    this._children[j + 1] = this._children[j];
                    j--;
                }
                this._children[j + 1] = tempItem;
            }

            //sorted now check all children
            if (this._children.length > 0) {
                //first sort all children recursively based on zOrder
                this._arrayMakeObjectsPerformSelector(this._children, cc.Node.StateCallbackType.sortAllChildren);

                var index = 0;
                //fast dispatch, give every child a new atlasIndex based on their relative zOrder (keep parent -> child relations intact)
                // and at the same time reorder descedants and the quads to the right index
                for (i = 0; i < this._children.length; i++) {
                    index = this._updateAtlasIndex(this._children[i], index);
                }
            }

            this._reorderChildDirty = false;
        }
    }