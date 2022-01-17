function(time, dynamicObject) {
        var dynamicPyramid = dynamicObject.pyramid;
        if (typeof dynamicPyramid === 'undefined') {
            return;
        }

        var directionsProperty = dynamicPyramid.directions;
        if (typeof directionsProperty === 'undefined') {
            return;
        }

        var positionProperty = dynamicObject.position;
        if (typeof positionProperty === 'undefined') {
            return;
        }

        var orientationProperty = dynamicObject.orientation;
        if (typeof orientationProperty === 'undefined') {
            return;
        }

        var pyramid;
        var showProperty = dynamicPyramid.show;
        var pyramidVisualizerIndex = dynamicObject._pyramidVisualizerIndex;
        var show = dynamicObject.isAvailable(time) && (typeof showProperty === 'undefined' || showProperty.getValue(time));

        if (!show) {
            //don't bother creating or updating anything else
            if (typeof pyramidVisualizerIndex !== 'undefined') {
                pyramid = this._pyramidCollection[pyramidVisualizerIndex];
                pyramid.show = false;
                dynamicObject._pyramidVisualizerIndex = undefined;
                this._unusedIndexes.push(pyramidVisualizerIndex);
            }
            return;
        }

        if (typeof pyramidVisualizerIndex === 'undefined') {
            var unusedIndexes = this._unusedIndexes;
            var length = unusedIndexes.length;
            if (length > 0) {
                pyramidVisualizerIndex = unusedIndexes.pop();
                pyramid = this._pyramidCollection[pyramidVisualizerIndex];
            } else {
                pyramidVisualizerIndex = this._pyramidCollection.length;
                pyramid = new CustomSensorVolume();
                this._pyramidCollection.push(pyramid);
                this._primitives.add(pyramid);
            }
            dynamicObject._pyramidVisualizerIndex = pyramidVisualizerIndex;
            pyramid.dynamicObject = dynamicObject;

            // CZML_TODO Determine official defaults
            pyramid.radius = Number.POSITIVE_INFINITY;
            pyramid.showIntersection = true;
            pyramid.intersectionColor = Color.YELLOW;
            pyramid.material = new ColorMaterial();
        } else {
            pyramid = this._pyramidCollection[pyramidVisualizerIndex];
        }

        pyramid.show = true;

        var directions = directionsProperty.getValueSpherical(time);
        if (typeof directions !== 'undefined' && pyramid._visualizerDirections !== directions) {
            pyramid.setDirections(directions);
            pyramid._visualizerDirections = directions;
        }

        position = positionProperty.getValueCartesian(time, position) || pyramid._visualizerPosition;
        orientation = orientationProperty.getValue(time, orientation) || pyramid._visualizerOrientation;

        if (typeof position !== 'undefined' &&
            typeof orientation !== 'undefined' &&
            (!position.equals(pyramid._visualizerPosition) ||
             !orientation.equals(pyramid._visualizerOrientation))) {
            pyramid.modelMatrix = new Matrix4(orientation.conjugate(orientation).toRotationMatrix(), position);
            position.clone(pyramid._visualizerPosition);
            orientation.clone(pyramid._visualizerOrientation);
        }

        var material = dynamicPyramid.material;
        if (typeof material !== 'undefined') {
            pyramid.material = material.getValue(time, this._scene.getContext(), pyramid.material);
        }

        var property = dynamicPyramid.intersectionColor;
        if (typeof property !== 'undefined') {
            var intersectionColor = property.getValue(time, intersectionColor);
            if (typeof intersectionColor !== 'undefined') {
                pyramid.intersectionColor = intersectionColor;
            }
        }

        property = dynamicPyramid.radius;
        if (typeof property !== 'undefined') {
            var radius = property.getValue(time, radius);
            if (typeof radius !== 'undefined') {
                pyramid.radius = radius;
            }
        }
    }