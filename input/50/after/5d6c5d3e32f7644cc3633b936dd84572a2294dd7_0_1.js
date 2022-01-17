function loadModel() {
        console.log('loadModel()');

        // TODO show loader animation
        var loader = new THREE.JSONLoader();
        loader.load(
            /*'assets/models/flamingo.js',*/
            'assets/models/eagle.js',
            function (g) {
                createModel(g);

                // TODO stop loader animation
            }
        );
    }