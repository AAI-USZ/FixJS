function loadModel(theModelData) {
        // load the model
        console.log('loading model %s', theModelData.modelFile);
        loader.load(theModelData.modelFile, function (loadedGeometry) {
            theModelData.geometry = loadedGeometry;

            buildModel(theModelData);
        });

        // load the material
        console.log('loading material %s', theModelData.materialFile);
        theModelData.material = new THREE.MeshBasicMaterial({
            map: THREE.ImageUtils.loadTexture(theModelData.materialFile),
            overdraw: true
        });
    }