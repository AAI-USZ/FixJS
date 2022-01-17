function loadModels() {

        var loader = new THREE.JSONLoader();

        // trigger models inside model list
        var numOfModels = modelData.length;
        var theModel;
        var i;
        for (i = 0; i < numOfModels; i++) {
            theModel = modelData[i];

            // load the model
            console.log('loading model %s', theModel.modelFile);
            loader.load(theModel.modelFile, function (loadedGeometry) {
                theModel.geometry = loadedGeometry;

                buildModel(theModel);
            });

            // load the material
            console.log('loading material %s', theModel.materialFile);
            theModel.material = new THREE.MeshBasicMaterial({
                map: THREE.ImageUtils.loadTexture(theModel.materialFile),
                overdraw: true
            });
        }
    }