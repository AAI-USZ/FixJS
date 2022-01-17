function CameraController() {

		/*

		this.camera = new Three.OrthographicCamera(

			-Settings.STAGE_WIDTH/2, 

			Settings.STAGE_WIDTH/2, 

			Settings.STAGE_HEIGHT/2, 

			-Settings.STAGE_HEIGHT/2, 

			-2000, 

			1000 

		);*/



		this.camera = new Three.OrthographicCamera( 600 / - 2, 600 / 2, 400 / 2, 400 / - 2, - 2000, 1000 );



		//this.camera = new Three.PerspectiveCamera(45, 600 / 400, 1, 1000);



		//this.camera.position.z = 481;

	}