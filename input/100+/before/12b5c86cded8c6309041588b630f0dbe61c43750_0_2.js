function(time, dynamicObject) {
        var dynamicPolyline = dynamicObject.polyline;
        if (typeof dynamicPolyline === 'undefined') {
            return;
        }

        var vertexPositionsProperty = dynamicObject.vertexPositions;
        if (typeof vertexPositionsProperty === 'undefined') {
            return;
        }

        var polyline;
        var showProperty = dynamicPolyline.show;
        var polylineVisualizerIndex = dynamicObject._polylineVisualizerIndex;
        var show = dynamicObject.isAvailable(time) && (typeof showProperty === 'undefined' || showProperty.getValue(time));

        if (!show) {
            //don't bother creating or updating anything else
            if (typeof polylineVisualizerIndex !== 'undefined') {
                polyline = this._polylineCollection[polylineVisualizerIndex];
                polyline.show = false;
                dynamicObject._polylineVisualizerIndex = undefined;
                this._unusedIndexes.push(polylineVisualizerIndex);
            }
            return;
        }

        if (typeof polylineVisualizerIndex === 'undefined') {
            var unusedIndexes = this._unusedIndexes;
            var length = unusedIndexes.length;
            if (length > 0) {
                polylineVisualizerIndex = unusedIndexes.pop();
                polyline = this._polylineCollection[polylineVisualizerIndex];
            } else {
                polylineVisualizerIndex = this._polylineCollection.length;
                polyline = new Polyline();
                this._polylineCollection.push(polyline);
                this._primitives.add(polyline);
            }
            dynamicObject._polylineVisualizerIndex = polylineVisualizerIndex;
            polyline.dynamicObject = dynamicObject;

            // CZML_TODO Determine official defaults
            polyline.color = Color.WHITE.clone(polyline.color);
            polyline.outlineColor = Color.BLACK.clone(polyline.outlineColor);
            polyline.outlineWidth = 1;
            polyline.width = 1;
        } else {
            polyline = this._polylineCollection[polylineVisualizerIndex];
        }

        polyline.show = true;

        var vertexPositions = vertexPositionsProperty.getValueCartesian(time);
        if (typeof vertexPositions !== 'undefined' && polyline._visualizerPositions !== vertexPositions) {
            polyline.setPositions(vertexPositions);
            polyline._visualizerPositions = vertexPositions;
        }

        var property = dynamicPolyline.color;
        if (typeof property !== 'undefined') {
            polyline.color = property.getValue(time, polyline.color);
        }

        property = dynamicPolyline.outlineColor;
        if (typeof property !== 'undefined') {
            polyline.outlineColor = property.getValue(time, polyline.outlineColor);
        }

        property = dynamicPolyline.outlineWidth;
        if (typeof property !== 'undefined') {
            var outlineWidth = property.getValue(time);
            if (typeof outlineWidth !== 'undefined') {
                polyline.outlineWidth = outlineWidth;
            }
        }

        property = dynamicPolyline.width;
        if (typeof property !== 'undefined') {
            var width = property.getValue(time);
            if (typeof width !== 'undefined') {
                polyline.width = width;
            }
        }
    }