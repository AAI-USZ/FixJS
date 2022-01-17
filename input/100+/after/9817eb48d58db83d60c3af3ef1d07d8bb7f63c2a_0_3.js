function () {
    'use strict';
    var scene, camera, renderer;
    var light;
    var modelContainer;
    var loader;
    var $container;

    var modelData = [];

    var VIEWPORT_WIDTH = 500;
    var VIEWPORT_HEIGHT = 300;
    var USE_CANVAS = false;

    // init everything
    function init() {
        // create scene
        scene = new THREE.Scene();

        // setup camera
        camera = new THREE.PerspectiveCamera(75, VIEWPORT_WIDTH / VIEWPORT_HEIGHT, 1, 10000);
        camera.position.z = 600;
        scene.add(camera);

        // create lights
        light = new THREE.PointLight(0xFFFFFF);
        light.position.x = 0;
        light.position.y = 100;
        light.position.z = 300;
        scene.add(light);

        // prepare renderer
        if (USE_CANVAS) {
            renderer = new THREE.CanvasRenderer();
        } else {
            renderer = new THREE.WebGLRenderer();
        }
        renderer.setSize(VIEWPORT_WIDTH, VIEWPORT_HEIGHT);

        // show renderer
        $container = $('#viewport');
        $container.append(renderer.domElement);
    }

    // load and init modelData
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

    // load models from model list
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

    // create mesh and insert into model container
    function buildModel(theModelData) {
        console.log('creating model with posY=%d', theModelData.posY);

        var modelMesh = new THREE.Mesh(theModelData.geometry, theModelData.material);
        modelMesh.position.x = theModelData.posX;
        modelMesh.position.y = theModelData.posY;
        modelMesh.scale.set(3, 3, 3);

        modelContainer.add(modelMesh);
    }

    // animate the model
    function updateModel() {
        if (modelContainer) {
            modelContainer.rotation.y += 0.02;
        }
    }

    // render model and scene
    function render() {
        updateModel();
        renderer.render(scene, camera);
    }

    function animate() {
        window.requestAnimationFrame(animate);
        render();
    }

    init();
    initModels();

    animate();
}