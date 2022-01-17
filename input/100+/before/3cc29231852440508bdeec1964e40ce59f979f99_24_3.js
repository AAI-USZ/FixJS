function(event) {
            var prevPosition;
            if(this.application.ninja.timeline.selectedStyle==="width" ||this.application.ninja.timeline.selectedStyle==="master" ){
                if(!event.wasSetByCode) {
                    if(this.savedPosition) prevPosition = [this.savedPosition + "px"];

                    this.application.ninja.elementMediator.setProperty([this.layerData.stageElement], "width", [this.dtextScaleX + "px"] , "Change", "timeline", prevPosition);
                    this.savedPosition = null;
                }
            }
        }