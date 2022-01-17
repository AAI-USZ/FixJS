function() {
    $('#qrcode').qrcode(document.location.href);
    
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

        renderer = new THREE.CanvasRenderer();
        renderer.setSize( window.innerWidth / 2, window.innerHeight / 2 );

        document.getElementById('main').appendChild( renderer.domElement );

    }

    function animate() {

        // note: three.js includes requestAnimationFrame shim
        requestAnimationFrame( animate );
        render();

    }

    function render() {

        //mesh.rotation.x += 0.01;
        //mesh.rotation.y += 0.02;

        renderer.render( scene, camera );

    }

    //////////////////////////////////////////////////////////////////////////////////////////
    // DeviceMotion
    
    if (window.DeviceMotionEvent) {
        console.log("DeviceMotionEvent supported");
        window.addEventListener('devicemotion', deviceMotionHandler, false);
    } else {
        document.getElementById("dmEvent").innerHTML = "devicemotion not supported on your device."
    }

    //////////////////////////////////////////////////////////////////////////////////////////
    // DeviceOrientation

    if (window.DeviceOrientationEvent) {
        document.getElementById("doEvent").innerHTML = "DeviceOrientation";
        // Listen for the deviceorientation event and handle the raw data
        window.addEventListener('deviceorientation', function(eventData) {
            // gamma is the left-to-right tilt in degrees, where right is positive
            var tiltLR = eventData.gamma;

            // beta is the front-to-back tilt in degrees, where front is positive
            var tiltFB = eventData.beta;

            // alpha is the compass direction the device is facing in degrees
            var dir = eventData.alpha

            // deviceorientation does not provide this data
            var motUD = null;

            // call our orientation event handler
            deviceOrientationHandler(tiltLR, tiltFB, dir, motUD);
        }, false);
    } else if (window.OrientationEvent) {
        document.getElementById("doEvent").innerHTML = "MozOrientation";
        window.addEventListener('MozOrientation', function(eventData) {
            // x is the left-to-right tilt from -1 to +1, so we need to convert to degrees
            var tiltLR = eventData.x * 90;

            // y is the front-to-back tilt from -1 to +1, so we need to convert to degrees
            // We also need to invert the value so tilting the device towards us (forward) 
            // results in a positive value. 
            var tiltFB = eventData.y * -90;

            // MozOrientation does not provide this data
            var dir = null;

            // z is the vertical acceleration of the device
            var motUD = eventData.z;

            // call our orientation event handler
            deviceOrientationHandler(tiltLR, tiltFB, dir, motUD);
        }, false);
    } else {
        document.getElementById("doEvent").innerHTML = "Not supported on your device or browser."
    }

//    var socket = io.connect('http://localhost');
//    socket.on('news', function (data) {
//      console.log(data);
//      socket.emit('my other event', { my: 'data' });
//    });
}