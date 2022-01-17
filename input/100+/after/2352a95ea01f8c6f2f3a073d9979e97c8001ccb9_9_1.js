function(time, dynamicObject) {
        var dynamicCone = dynamicObject.cone;
        if (typeof dynamicCone === 'undefined') {
            return;
        }

        var maximumClockAngleProperty = dynamicCone.maximumClockAngle;
        if (typeof maximumClockAngleProperty === 'undefined') {
            return;
        }

        var outerHalfAngleProperty = dynamicCone.outerHalfAngle;
        if (typeof outerHalfAngleProperty === 'undefined') {
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

        var cone;
        var showProperty = dynamicCone.show;
        var coneVisualizerIndex = dynamicObject._coneVisualizerIndex;
        var show = dynamicObject.isAvailable(time) && (typeof showProperty === 'undefined' || showProperty.getValue(time));

        if (!show) {
            //don't bother creating or updating anything else
            if (typeof coneVisualizerIndex !== 'undefined') {
                cone = this._coneCollection[coneVisualizerIndex];
                cone.show = false;
                dynamicObject._coneVisualizerIndex = undefined;
                this._unusedIndexes.push(coneVisualizerIndex);
            }
            return;
        }

        if (typeof coneVisualizerIndex === 'undefined') {
            var unusedIndexes = this._unusedIndexes;
            var length = unusedIndexes.length;
            if (length > 0) {
                coneVisualizerIndex = unusedIndexes.pop();
                cone = this._coneCollection[coneVisualizerIndex];
            } else {
                coneVisualizerIndex = this._coneCollection.length;
                //cone = new ComplexConicSensorVolume();
                cone = new CustomSensorVolume();
                cone.innerHalfAngle = 0;
                cone.minimumClockAngle = 0;
                this._coneCollection.push(cone);
                this._primitives.add(cone);
            }
            dynamicObject._coneVisualizerIndex = coneVisualizerIndex;
            cone.dynamicObject = dynamicObject;

            // CZML_TODO Determine official defaults
            cone.innerHalfAngle = 0;
            cone.outerHalfAngle = Math.PI;
            cone.material = new ColorMaterial();
            cone.intersectionColor = Color.YELLOW;
            cone.minimumClockAngle = -CesiumMath.TWO_PI;
            cone.maximumClockAngle =  CesiumMath.TWO_PI;
            cone.radius = Number.POSITIVE_INFINITY;
            cone.showIntersection = true;
        } else {
            cone = this._coneCollection[coneVisualizerIndex];
        }

        cone.show = true;

        var innerHalfAngle = 0;
        var outerHalfAngle = Math.PI;
        var maximumClockAngle =  CesiumMath.TWO_PI;
        var minimumClockAngle = -CesiumMath.TWO_PI;

        var property = dynamicCone.minimumClockAngle;
        if (typeof property !== 'undefined') {
            var tmpClock = property.getValue(time);
            if (typeof tmpClock !== 'undefined') {
                minimumClockAngle = tmpClock;
            }
        }

        maximumClockAngle = maximumClockAngleProperty.getValue(time) || Math.pi;

        property = dynamicCone.innerHalfAngle;
        if (typeof property !== 'undefined') {
            var tmpAngle = property.getValue(time);
            if (typeof tmpAngle !== 'undefined') {
                innerHalfAngle = tmpAngle;
            }
        }

        outerHalfAngle = outerHalfAngleProperty.getValue(time) || Math.pi;

        if (minimumClockAngle !== cone.minimumClockAngle ||
            maximumClockAngle !== cone.maximumClockAngle ||
            innerHalfAngle !== cone.innerHalfAngle ||
            outerHalfAngle !== cone.outerHalfAngle) {
            cone.setDirections(computeDirections(minimumClockAngle, maximumClockAngle, innerHalfAngle, outerHalfAngle));
            cone.innerHalfAngle = innerHalfAngle;
            cone.maximumClockAngle = maximumClockAngle;
            cone.outerHalfAngle = outerHalfAngle;
            cone.minimumClockAngle = minimumClockAngle;
        }

        property = dynamicCone.radius;
        if (typeof property !== 'undefined') {
            var radius = property.getValue(time);
            if (typeof radius !== 'undefined') {
                cone.radius = radius;
            }
        }

        position = positionProperty.getValueCartesian(time, position) || cone._visualizerPosition;
        orientation = orientationProperty.getValue(time, orientation) || cone._visualizerOrientation;

        if (typeof position !== 'undefined' &&
            typeof orientation !== 'undefined' &&
            (!position.equals(cone._visualizerPosition) ||
             !orientation.equals(cone._visualizerOrientation))) {
            cone.modelMatrix = new Matrix4(Matrix3.fromQuaternion(orientation.conjugate(orientation)), position);
            position.clone(cone._visualizerPosition);
            orientation.clone(cone._visualizerOrientation);
        }

        var context = this._scene.getContext();
        var material = dynamicCone.outerMaterial;
        if (typeof material !== 'undefined') {
            cone.material = material.getValue(time, context, cone.material);
        }

        property = dynamicCone.intersectionColor;
        if (typeof property !== 'undefined') {
            intersectionColor = property.getValue(time, intersectionColor);
            if (typeof intersectionColor !== 'undefined') {
                cone.intersectionColor = intersectionColor;
            }
        }
    }