function() {
        var i;
        this._polylineCollection.removeAll();

        if (typeof this._dynamicObjectCollection !== 'undefined') {
            var dynamicObjects = this._dynamicObjectCollection.getObjects();
            for (i = dynamicObjects.length - 1; i > -1; i--) {
                dynamicObjects[i]._polylineVisualizerIndex = undefined;
            }
        }

        this._unusedIndexes = [];
    }