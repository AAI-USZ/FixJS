function(event) {
                if (event.type === Mojo.Event.command) {
                        if (event.command == 'goBack') {
                        	this.controller.stageController.popScene();
                        }
                          if (event.command == 'share') {
                            this.sharePopUp(event);
                        }
                };
                

}