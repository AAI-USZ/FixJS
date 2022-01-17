function CameraController(isOrthographic) {



		isOrthographic = typeof isOrthographic == 'undefined' 

			? true 

			: isOrthographic;





		if(isOrthographic) {

			

			this.camera = new Three.OrthographicCamera(

				-Settings.STAGE_WIDTH/2, 

				Settings.STAGE_WIDTH/2, 

				Settings.STAGE_HEIGHT/2, 

				-Settings.STAGE_HEIGHT/2, 

				-2000, 

				1000 

			);



		} else {



			this.camera = new Three.PerspectiveCamera(

				45, 

				Settings.STAGE_WIDTH / Settings.STAGE_HEIGHT, 

				-2000, 

				1000

			);

		}



		this.camera.position.z = 481;

	}