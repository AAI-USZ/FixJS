function (movement) {
            var origPos = this.get('origPos');

            this.get('object' ).position = new THREE.Vector3(
                origPos.x + movement.x,
                origPos.y + movement.y,
                origPos.z + movement.z
            );
        }