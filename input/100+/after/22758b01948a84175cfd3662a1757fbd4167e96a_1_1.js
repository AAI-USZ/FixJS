function(){
	mixer = new Mixer();

	setLoadingBar(0.4,function(){
	camera = new THREE.PerspectiveCamera(45, 16 / 9, 0.1, 10000);
	camera.position.y = 200;
	startcamera = new THREE.PerspectiveCamera(45, 16 / 9, 0.1, 10000);
	startcamera.time = 0;
	goalcamera = new THREE.PerspectiveCamera(45, 16 / 9, 0.1, 10000);
	goalcamera.time = 0;
	cameratarget = new THREE.Vector3(0,0,0);

	setLoadingBar(0.6,function(){

	scene = new THREE.Scene();
	scene.add(camera);
	cubes = [];
	side = 32;

	x_spacing = 5 + 2.545 + 0.5;
	z_spacing = 4.363 * 2 + 0.5;


	setLoadingBar(0.7,function(){
	
	materials = [ new THREE.MeshLambertMaterial({
		color : 0xE8B86F, blending : THREE.AdditiveBlending, transparent:true
	}), new THREE.MeshLambertMaterial({
		color : 0xFFBD0D
	}), new THREE.MeshLambertMaterial({
		color : 0xFF7F00
	}), new THREE.MeshLambertMaterial({
		color : 0xE85700
	}), new THREE.MeshLambertMaterial({
		color : 0x4A0808
	}) ];

	geometry = createHexagonGeometry(10, -10);
	for ( var i = 0; i < side; i++) {
		for ( var j = 0; j < side; j++) {
			cubes[i * side + j] = new Hexagon((i - side / 2) * x_spacing, 0,
					(i % 2) * z_spacing / 2 + (j - side / 2) * z_spacing);
			scene.add(cubes[i * side + j].mesh);
		}
	}
	light = new THREE.SpotLight();
	light.intensity = 0.5;
	scene.add(light);

	setLoadingBar(0.8,function(){
		
	kewbe = new Kewbe();
	lyte = new Lyte(0, 40, 0);

	
	setLoadingBar(0.9,function(){
	skybox = createSkybox("");
	scene.add(skybox);
		
	
	setLoadingBar(1,function(){
	midi.add_callback(function(e) {
		mixer.handle_event(e);
	});
	midi.add_callback(function(e){
		if(e.note_number == 36 && e.midi_channel == 9){
			newRandomCameraMovement(e.time_to_next_sameevent / midi.ticks_per_second * 44100*0.5);
		}
	});
	mixer.start();
	})})})})})})}