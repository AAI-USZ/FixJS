function initModels() {
        // create plane shadow
        var geometry = new THREE.PlaneGeometry(300, 300, 3, 3);
        var material = new THREE.MeshBasicMaterial({
            map: THREE.ImageUtils.loadTexture('assets/textures/shadow.png'),
            overdraw: true
        });
        var shadowPlane = new THREE.Mesh(geometry, material);
        shadowPlane.position.y = -350;
        scene.add(shadowPlane);

        // init model data
        modelData.push({ 'modelFile': 'assets/models/eagle.js', 'materialFile': 'assets/textures/cardboard-brown-512.png', 'posX': 100, 'posY': 150 });
        modelData.push({ 'modelFile': 'assets/models/flamingo.js', 'materialFile': 'assets/textures/cardboard-512.png', 'posX': -100, 'posY': 0 });

        // prepare model container
        modelContainer = new THREE.Object3D();
        scene.add(modelContainer);

        // load models
        loader = new THREE.JSONLoader();
        var numOfModels = modelData.length;
        var i;
        for (i = 0; i < numOfModels; i++) {
            loadModel(modelData[i]);
        }
    }