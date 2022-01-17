function() {
		    this.setAnimObject(null);
		    this.stage.removeAllChildren();
		    this.stage.setAnimations({});
		    dojo.publish("/animwidget/initStage", [this.stage]);
		}