function(event) {
            if(this.application.ninja.timeline.selectedStyle==="top" ||this.application.ninja.timeline.selectedStyle==="master" ){
                if(!event.wasSetByCode) {
                    if(!this.savedPosition) this.savedPosition = this.topPosition;
                    this.application.ninja.elementMediator.setProperty([this.layerData.stageElement], "top", [this.topControl.value + "px"] , "Changing", "timeline");
                }
            }

        }