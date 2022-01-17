function () {
        if (this._reorderChildDirty) {
            var i, j, length = this._children.length;

            // insertion sort
            for (i = 0; i < length - 1; i++) {
                var tempItem = this._children[i];
                j = i - 1;

                //continue moving element downwards while zOrder is smaller or when zOrder is the same but mutatedIndex is smaller
                while (j >= 0 && ( tempItem._zOrder < this._children[j]._zOrder ||
                    ( tempItem._zOrder == this._children[j]._zOrder && tempItem._orderOfArrival < this._children[j]._orderOfArrival ))) {
                    this._children[j + 1] = this._children[j];
                    j = j - 1;
                }
                this._children[j + 1] = tempItem;
            }

            //don't need to check children recursively, that's done in visit of each child
            this._reorderChildDirty = false;
        }
    }