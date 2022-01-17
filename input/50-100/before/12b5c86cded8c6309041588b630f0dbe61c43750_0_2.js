function(dynamicObjectCollection, dynamicObjects) {
        var thisPolylineCollection = this._polylineCollection;
        var thisUnusedIndexes = this._unusedIndexes;
        for ( var i = dynamicObjects.length - 1; i > -1; i--) {
            var dynamicObject = dynamicObjects[i];
            var polylineVisualizerIndex = dynamicObject._polylineVisualizerIndex;
            if (typeof polylineVisualizerIndex !== 'undefined') {
                var polyline = thisPolylineCollection[polylineVisualizerIndex];
                polyline.show = false;
                thisUnusedIndexes.push(polylineVisualizerIndex);
                dynamicObject._polylineVisualizerIndex = undefined;
            }
        }
    }