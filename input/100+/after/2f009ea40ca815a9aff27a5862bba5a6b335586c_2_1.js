function(event) {
            var prevPosition;

                if(!event.wasSetByCode) {
                    if(this.savedPosition) prevPosition = [this.savedPosition + "px"];
                        this.application.ninja.elementMediator.setProperty([this.layerData.stageElement], "left", [this.leftControl.value + "px"] , "Change", "timeline", prevPosition);
                        this.savedPosition = null;
                }


        }