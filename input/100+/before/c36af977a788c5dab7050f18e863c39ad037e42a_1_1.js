function init(width, height, storyboard) {


	//    	geometry = new THREE.CubeGeometry( 200, 200, 200 );
	//        material = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: true } );

	//        var mesh = new THREE.Mesh( geometry, material );

	  	    //anim  = {id:1,obj:mesh,n:5,transitions: [cube_t1,cube_t4],x0:0,y0:0,z0:-7,dx:0,dy:0,dz:0,sx:1,sy:1,sz:1,rx:0,ry:0,rz:0};

	  	    


//	    	var meshes;

	    


	        scene = new THREE.Scene();

	//        container = document.getElementById( 'container' );
	        //container = $('#container');
	//		document.body.appendChild( container );
	//        var divStats = document.getElementById ('stats');
	        //var divStats = $('#stats');

	        var canvas = document.getElementById("canvas");
	




	//        camera = new THREE.PerspectiveCamera( 45, width / height, 0.1, 10000 );
	//        camera.position.z = 1500;
	//        camera.position.y = 100;
	//        camera.lookAt( scene.position );
	//        scene.add( camera );

        createMeshesFromStoryboard (storyboard, width, height);

//	      if (_meshes === undefined) {

//	        meshes = animations;

//	        cameras[0] = new THREE.PerspectiveCamera (45, width / height, 0.1, 10000);
//	        cameras[0].position = {x : 0, y : 0, z : 1500};
//	        cameras[1] = new THREE.PerspectiveCamera (45, width / height, 0.1, 10000);
//	        cameras[1].position = {x : 1500, y : 0, z : 0};
//	        cameras[2] = new THREE.PerspectiveCamera (45, width / height, 0.1, 10000);
//	        cameras[2].position = {x : 0, y : 0, z : -1500};
//	        cameras[3] = new THREE.PerspectiveCamera (45, width / height, 0.1, 10000);
//	        cameras[3].position = {x : -1500, y : 0, z : 0};
//	        cameras[4] = new THREE.PerspectiveCamera (45, width / height, 0.1, 10000);
//	        cameras[4].position = {x : 0, y : 1500, z : 0};
//	        cameras[5] = new THREE.PerspectiveCamera (45, width / height, 0.1, 10000);
//	        cameras[5].position = {x : 0, y : -1500, z : 0};

//	        for (var i in cameras)
//	          cameras[i].lookAt ({x : 0, y : 0, z : 0});
//	      } else {

//	        meshes = _meshes;

//	        for (var i in _meshes) {
//	          if (_meshes[i].obj instanceof THREE.PerspectiveCamera) {
//	            _meshes[i].obj.position = {x : 0, y : 0, z : 100}; // TODO: dove si prendono le coordinate iniziali?
//	            cameras.push (_meshes[i].obj);
//	          }
//	        }

//	      }

	        camera = cameras[0];
	        if (camera === undefined)
	          alert ("Si deve aggiungere almeno una camera!");
	        scene.add (camera);
	
	        


	        var camera_buttons = $('#camera_buttons');
				camera_buttons.empty();
	        for (var i in cameras) {
	          var i1 = parseInt (i) + 1;
	          camera_buttons.append ('<button onClick="changeCamera (cameras[' + i + '])">Camera ' + i1 + '</button>');
	        }

	//        camera0 = {x:0,y:100,z:1500};

	//        camera90dx = {x:1500,y:100,z:0};


	//        camera90sx = {x:-1500,y:100,z:0};
	//        

	//        camera180 = {x:0,y:100,z:-1500};




//	        for (var i in meshes) {
//	        	var m = meshes[i].obj;
//	        	scene.add( m );

//	        }

	        light = new THREE.DirectionalLight( 0xffffff, 1.5 );
					light.position.set( 0, 1, 1 ).normalize();

			scene.add(light);
			
			//stats = new Stats();
	//		stats.domElement.style.position = 'absolute';
	//		stats.domElement.style.top = '20px';
			//divStats.append ( $(stats.domElement) );

	        
	        

	  renderer = new THREE.WebGLRenderer ({
	    antialias : true,
	    clearAlpha : 1.0,
	    precision : "highp",
	    canvas : canvas
	  });
	  renderer.setSize( width, height );
    //renderer.render (scene, camera);

//	        container.append ( $(renderer.domElement) );

	        //document.addEventListener( 'keypress', onKeyPressEventHandler, false );

	    }