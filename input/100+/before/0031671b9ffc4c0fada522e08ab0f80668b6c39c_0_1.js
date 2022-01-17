function Preview3D(options) {
	var stage = $('#'+options.elemID);
	var width = stage.width();
	var height = stage.height();
	// Set up scene
	var scene = new THREE.Scene();
	// Add camera
	var camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
	var rotation = Math.PI/2;
	scene.add(camera);
	
	// Setup point lighting
	var pointLight = new THREE.PointLight(0xFFFFFF);
	// by assigning the reference of camera.position, 
	// pointLight.position will be updated as camera.position
	pointLight.position = camera.position;
	pointLight.castShadow = true;
	scene.add(pointLight);
	
	// Setup ambient lighting
	var ambientLight = new THREE.AmbientLight(0x001111);
	scene.add(ambientLight);
	
	renderer = new THREE.WebGLRenderer();
	renderer.setSize(width, height);
	stage.append(renderer.domElement);
	
	var updateCameraPosition = function() {
		camera.position.x = Math.cos(rotation)*500;
		camera.position.z = Math.sin(rotation)*500;
		camera.position.y = 300;
		camera.lookAt(new THREE.Vector3(0, 0, 0));
	};

	var render = function() {
		updateCameraPosition();
		renderer.render(scene, camera);	
	};
	
	// predefined shape to be previewed by the Botprint app
	var geometry = new THREE.CubeGeometry( 100, 100, 100 );
	var material = new THREE.MeshBasicMaterial( { color: 0x00ff00, wireframe: true } );
	var object 	 = new THREE.Mesh( geometry, material );
	scene.add(object);
	
	
	var self = {
		animate: function() {
			rotation += Math.PI / 200;
			render();
			requestAnimationFrame(self.animate);
		},
		updateChassis: function(chassis) {
			if(object) {
				scene.remove(object);
			}
			object = chassis;
			scene.add(object);
		}
	};
	
	$.extend(self, View());
	var handler = Preview3DHandler(self, {bus: options.bus});
	handler.enable();
	return self;
}