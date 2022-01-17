function (movement) {
            var origPos = this.get('origPos')
              , pos = new THREE.Vector3(
                    origPos.x + movement.x,
                    origPos.y + movement.y,
                    origPos.z + movement.z
                );

            this.get('mesh'   ).position = pos;
            this.get('shading').position = pos;
            this.get('object' ).position = pos;
        }