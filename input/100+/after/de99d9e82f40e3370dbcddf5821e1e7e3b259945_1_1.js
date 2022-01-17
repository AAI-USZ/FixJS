function(time, dynamicObject) {
        var dynamicCone = dynamicObject.cone;
        if (typeof dynamicCone === 'undefined') {
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
                cone = new ComplexConicSensorVolume();
                this._coneCollection.push(cone);
                this._primitives.add(cone);
            }
            dynamicObject._coneVisualizerIndex = coneVisualizerIndex;
            cone.dynamicObject = dynamicObject;

            // CZML_TODO Determine official defaults
            cone.capMaterial = new ColorMaterial();
            cone.innerHalfAngle = 0;
            cone.outerHalfAngle = Math.PI;
            cone.innerMaterial = new ColorMaterial();
            cone.intersectionColor = Color.YELLOW;
            cone.maximumClockAngle =  CesiumMath.TWO_PI;
            cone.minimumClockAngle = -CesiumMath.TWO_PI;
            cone.outerMaterial = new ColorMaterial();
            cone.radius = Number.POSITIVE_INFINITY;
            cone.showIntersection = true;
            cone.silhouetteMaterial = new ColorMaterial();
        } else {
            cone = this._coneCollection[coneVisualizerIndex];
        }

        cone.show = true;
        var property = dynamicCone.minimumClockAngle;
        if (typeof property !== 'undefined') {
            var minimumClockAngle = property.getValue(time);
            if (typeof minimumClockAngle !== 'undefined') {
                cone.minimumClockAngle = minimumClockAngle;
            }
        }

        property = dynamicCone.maximumClockAngle;
        if (typeof property !== 'undefined') {
            var maximumClockAngle = property.getValue(time);
            if (typeof maximumClockAngle !== 'undefined') {
                cone.maximumClockAngle = maximumClockAngle;
            } else {
                cone.maximumClockAngle = Math.pi;
            }
        }

        property = dynamicCone.innerHalfAngle;
        if (typeof property !== 'undefined') {
            var innerHalfAngle = property.getValue(time);
            if (typeof innerHalfAngle !== 'undefined') {
                cone.innerHalfAngle = innerHalfAngle;
            }
        }

        property = dynamicCone.outerHalfAngle;
        if (typeof property !== 'undefined') {
            var outerHalfAngle = property.getValue(time);
            if (typeof outerHalfAngle !== 'undefined') {
                cone.outerHalfAngle = outerHalfAngle;
            } else {
                cone.outerHalfAngle = Math.pi;
            }
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
            cone.modelMatrix = Matrix4.fromRotationTranslation(Matrix3.fromQuaternion(orientation.conjugate(orientation)), position);
            position.clone(cone._visualizerPosition);
            orientation.clone(cone._visualizerOrientation);
        }

        var context = this._scene.getContext();
        var material = dynamicCone.capMaterial;
        if (typeof material !== 'undefined') {
            cone.capMaterial = material.getValue(time, context, cone.capMaterial);
        }

        material = dynamicCone.innerMaterial;
        if (typeof material !== 'undefined') {
            cone.innerMaterial = material.getValue(time, context, cone.innerMaterial);
        }

        material = dynamicCone.outerMaterial;
        if (typeof material !== 'undefined') {
            cone.outerMaterial = material.getValue(time, context, cone.outerMaterial);
        }

        material = dynamicCone.silhouetteMaterial;
        if (typeof material !== 'undefined') {
            cone.silhouetteMaterial = material.getValue(time, context, cone.silhouetteMaterial);
        }

        property = dynamicCone.intersectionColor;
        if (typeof property !== 'undefined') {
            intersectionColor = property.getValue(time, intersectionColor);
            if (typeof intersectionColor !== 'undefined') {
                cone.intersectionColor = intersectionColor;
            }
        }
    }