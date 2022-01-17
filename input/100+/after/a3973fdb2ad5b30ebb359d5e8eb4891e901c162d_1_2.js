function() {
    $('#qrcode').qrcode(document.location.href + 'control.html');
    
    //////////////////////////////////////////////////////////////////////////////////////////
    // Three.js
    
    init();
    animate();

    function init() {

        scene = new THREE.Scene();

        camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
        camera.position.z = 1000;
        scene.add( camera );

        geometry = new THREE.CubeGeometry( 400, 400, 400 );
        material = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: true } );

        mesh = new THREE.Mesh( geometry, material );
        scene.add( mesh );

        renderer = new THREE.WebGLRenderer();
        renderer.setSize( window.innerWidth / 2, window.innerHeight / 2 );

        document.getElementById('main').appendChild( renderer.domElement );

    }

    function animate() {

        // note: three.js includes requestAnimationFrame shim
        requestAnimationFrame( animate );
        render();

    }

    function render() {

        renderer.render( scene, camera );

    }


    socket = io.connect('http://localhost:7777');
    socket.on('motion', function (data) {
      deviceMotionHandler(data);
    });
    socket.on('orientation', function (data) {
      deviceOrientationHandler(data.tiltLR, data.tiltFB, data.dir, data.motionUD);
    });
}