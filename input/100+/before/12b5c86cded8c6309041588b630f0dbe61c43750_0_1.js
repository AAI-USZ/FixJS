function() {
        var i, len;
        for (i = 0, len = this._polylineCollection.length; i < len; i++) {
            this._primitives.remove(this._polylineCollection[i]);
        }

        if (typeof this._dynamicObjectCollection !== 'undefined') {
            var dynamicObjects = this._dynamicObjectCollection.getObjects();
            for (i = dynamicObjects.length - 1; i > -1; i--) {
                dynamicObjects[i]._polylineVisualizerIndex = undefined;
            }
        }

        this._unusedIndexes = [];
        this._polylineCollection = [];
    }