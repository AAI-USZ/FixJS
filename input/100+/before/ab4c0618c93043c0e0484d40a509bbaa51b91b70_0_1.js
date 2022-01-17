function(geom,prop) {
        var color = { color: Math.random() * 0xffffff };
        if(prop.color) color = {color: prop.color};
        if(!prop.material){
            prop.material = new THREE.MeshLambertMaterial( color );
        }
        var object = new THREE.Mesh( geom, prop.material);
        object.material.ambient = color;
        object.rotation = new THREE.Vector3(0, 0, 0);
        object.scale = new THREE.Vector3(1, 1, 1);
        object.castShadow = true;
        object.receiveShadow = true;
        return object;
    }