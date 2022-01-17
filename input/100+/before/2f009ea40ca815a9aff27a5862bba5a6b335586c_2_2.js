function(event) {
            var prevPosition;
            if(this.application.ninja.timeline.selectedStyle==="top" ||this.application.ninja.timeline.selectedStyle==="master" ){
                if(!event.wasSetByCode) {
                    if(this.savedPosition) prevPosition = [this.savedPosition + "px"];

                    this.application.ninja.elementMediator.setProperty([this.layerData.stageElement], "top", [this.topControl.value + "px"] , "Change", "timeline", prevPosition);
                    this.savedPosition = null;
                }
            }
        }