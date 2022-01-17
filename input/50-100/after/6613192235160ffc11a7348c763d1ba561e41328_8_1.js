function(value) {
            var interp = position.lerp(newPosition, value.time);
            var pos = new Cartesian4(interp.x, interp.y, interp.z, 1.0);
            camera.position = Cartesian3.fromCartesian4(camera.getInverseTransform().multiplyWithVector(pos));
        }