function(event) {
                if (event.type === Mojo.Event.command) {
                        if (event.command == 'goBack') {
                        	this.controller.stageController.popScene(this.pop);
                        }
                          if (event.command == 'share') {
                            this.sharePopUp(event);
                        }
                        if (event.command == 'do-favorites') {
                            this.Favorites(event);
                        }
                };
                
                //handle Back swipe event   
				if (event.type == Mojo.Event.back) {
					this.controller.stageController.popScene(this.pop);
				};
                

}