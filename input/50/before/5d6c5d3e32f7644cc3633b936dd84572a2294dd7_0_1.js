function loadModel() {
        // TODO show loader animation
        var loader = new THREE.JSONLoader();
        loader.load({
            model: 'assets/models/eagle.js',
            callback: function (g) {
                console.log('model loaded');
                createModel(g);

                // TODO remove loader animation
            }
        });
    }