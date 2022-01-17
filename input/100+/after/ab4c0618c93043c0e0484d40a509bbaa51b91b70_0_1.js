function(geom,prop) {
        var material = new THREE.MeshLambertMaterial( { color: Math.random() * 0xffffff } );
        var object = new THREE.Mesh( geom, material);
        object.material.ambient = object.material.color;
        object.rotation = new THREE.Vector3(0, 0, 0);
        object.scale = new THREE.Vector3(1, 1, 1);
        object.castShadow = true;
        object.receiveShadow = true;
        return object;
    }