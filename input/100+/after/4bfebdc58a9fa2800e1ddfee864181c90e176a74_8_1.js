function(scene) {
			for(var key in this.sceneItems) {
				this.sceneItems[key].destroyRecursive(false);
			}
			sceneItems = {};
			this.activeScene = scene;
			this.scenes[this.activeScene] = {};
		    Storage.setString("activeScene", this.activeScene);
			this.initScenes();
			this.onActivateScene(scene);
		}