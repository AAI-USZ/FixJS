function(event) {
                if (event.type === Mojo.Event.command) {
                        if (event.command == 'goBack') {
                        this.controller.stageController.popScene(this.pop);
                        }
                };
                
                //handle Back swipe event   
				if (event.type == Mojo.Event.back) {
					this.controller.stageController.popScene(this.pop);
				};
                

}