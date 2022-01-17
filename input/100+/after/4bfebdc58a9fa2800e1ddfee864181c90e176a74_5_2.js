function() {
			for(var key in AnimEn.getInst().getAllScenes()) {
				AnimEn.getInst().deleteScene(key);
			}
		    this.setAnimObject(null);
		    this.stage.removeAllChildren();
		    this.stage.setAnimations({});
		    this.activeScene = "defaultAnim";
		    dojo.publish("/animwidget/resetScenes", [this.activeScene]);
		    dojo.publish("/animwidget/initStage", [this.stage]);
		    dojo.publish("/animwidget/update", [this.stage]);
		}