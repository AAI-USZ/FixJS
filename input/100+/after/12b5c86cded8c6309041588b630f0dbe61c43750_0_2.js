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
                polyline = this._polylineCollection.get(polylineVisualizerIndex);
                polyline.setShow(false);
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
                polyline = this._polylineCollection.get(polylineVisualizerIndex);
            } else {
                polylineVisualizerIndex = this._polylineCollection.getLength();
                polyline = this._polylineCollection.add();
            }
            dynamicObject._polylineVisualizerIndex = polylineVisualizerIndex;
            polyline.dynamicObject = dynamicObject;

            // CZML_TODO Determine official defaults
            polyline.setColor(Color.WHITE.clone(polyline.getColor()));
            polyline.setOutlineColor(Color.BLACK.clone(polyline.getOutlineColor()));
            polyline.setOutlineWidth(1);
            polyline.setWidth(1);
        } else {
            polyline = this._polylineCollection.get(polylineVisualizerIndex);
        }

        polyline.setShow(true);

        var vertexPositions = vertexPositionsProperty.getValueCartesian(time);
        if (typeof vertexPositions !== 'undefined' && polyline._visualizerPositions !== vertexPositions) {
            polyline.setPositions(vertexPositions);
            polyline._visualizerPositions = vertexPositions;
        }

        var property = dynamicPolyline.color;
        if (typeof property !== 'undefined') {
            polyline.setColor(property.getValue(time, polyline.getColor()));
        }

        property = dynamicPolyline.outlineColor;
        if (typeof property !== 'undefined') {
            polyline.setOutlineColor(property.getValue(time, polyline.getOutlineColor()));
        }

        property = dynamicPolyline.outlineWidth;
        if (typeof property !== 'undefined') {
            var outlineWidth = property.getValue(time);
            if (typeof outlineWidth !== 'undefined') {
                polyline.setOutlineWidth(outlineWidth);
            }
        }

        property = dynamicPolyline.width;
        if (typeof property !== 'undefined') {
            var width = property.getValue(time);
            if (typeof width !== 'undefined') {
                polyline.setWidth(width);
            }
        }
    }