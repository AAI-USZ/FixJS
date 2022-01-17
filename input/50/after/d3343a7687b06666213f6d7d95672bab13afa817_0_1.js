function () {
		//There is a really, really good reason to have this function.
		//If you add the position of the camera to all objects in the scene,
		//they display offset in the direction -oposite- of where they would
		//had you moved a physical camera - so it is better to add negative
		//camera position each frame. Also, if the rendering methods all use
		//t.invertedCameraPos as it is defined at the start of each frame,
		//you won't have rendering issues caused by objects within the scene
		//changing the position of the camera and some objects rending at the
		//old position with others rendering in the new position.
		this.invertedCameraPos = [
			-this.camera.pos[0],
			-this.camera.pos[1],
			-this.camera.pos[2]
		];
	}