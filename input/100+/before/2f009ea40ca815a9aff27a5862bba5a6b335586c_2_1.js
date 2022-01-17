function(event) {
            var prevPosition;
            if(this.application.ninja.timeline.selectedStyle==="left" ||this.application.ninja.timeline.selectedStyle==="master" ){
                if(!event.wasSetByCode) {
                    if(this.savedPosition) prevPosition = [this.savedPosition + "px"];
                        this.application.ninja.elementMediator.setProperty([this.layerData.stageElement], "left", [this.leftControl.value + "px"] , "Change", "timeline", prevPosition);
                        this.savedPosition = null;
                }

            }
        }