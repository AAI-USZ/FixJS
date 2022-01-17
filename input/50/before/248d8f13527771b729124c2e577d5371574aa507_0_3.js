function (mesh) {
            return this.find( function (cube) {
                return cube.get('mesh').id === (mesh && mesh.id);
            }) || null;
        }