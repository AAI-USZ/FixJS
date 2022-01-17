function(value) {
            var interp = position.lerp(newPosition, value.time);
            var pos = new Cartesian4(interp.x, interp.y, interp.z, 1.0);
            camera.position = camera.getInverseTransform().multiplyWithVector(pos).getXYZ();
        }