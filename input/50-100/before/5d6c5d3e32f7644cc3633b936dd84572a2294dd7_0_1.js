function createModel(geometry) {
        var material = new THREE.MeshBasicMaterial({
            map: THREE.ImageUtils.loadTexture('assets/textures/cardboard-512.jpg'),
            doubleSided: false,
            color: 0xffffff
        });
        model = new THREE.Mesh(geometry, material);
        scene.add(model);
    }