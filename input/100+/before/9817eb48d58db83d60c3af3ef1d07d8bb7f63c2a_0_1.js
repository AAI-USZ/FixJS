function initModels() {
        // create plane shadow
        var geometry = new THREE.PlaneGeometry(300, 300, 3, 3);
        var material = new THREE.MeshBasicMaterial({
            map: THREE.ImageUtils.loadTexture('assets/textures/shadow.png'),
            overdraw: true
        });
        var shadowPlane = new THREE.Mesh(geometry, material);
        shadowPlane.position.y = -250;
        scene.add(shadowPlane);

        // init model data
        modelData.push({ 'modelFile': 'assets/models/eagle.js', 'materialFile': 'assets/textures/cardboard-brown-512.png', 'posY': 0 });
        modelData.push({ 'modelFile': 'assets/models/flamingo.js', 'materialFile': 'assets/textures/cardboard-512.png', 'posY': 50 });

        // prepare model container
        modelContainer = new THREE.Object3D();
        scene.add(modelContainer);

        loadModels();
    }