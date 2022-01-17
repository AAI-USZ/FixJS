function() {
			dojo.subscribe("/animwidget/initStage", this, "onInitStage");
			dojo.subscribe("/sceneitem/activatescene", this, "onActivateScene");
			dojo.subscribe("/sceneitem/deletescene", this, "onDeleteScene");
			dojo.create("link", {
				rel : "stylesheet",
				href : "./widgets/templates/css/scenewidget.css"
			}, dojo.query("head")[0]);
			this.scenes = AnimEn.getInst().getAllScenes();
		}