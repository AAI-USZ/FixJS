function(event) {
            if(this.application.ninja.timeline.selectedStyle==="width" ||this.application.ninja.timeline.selectedStyle==="master" ){
                if(!event.wasSetByCode) {
                    if(!this.savedPosition) this.savedPosition = this.dtextScaleX;
                    this.application.ninja.elementMediator.setProperty([this.layerData.stageElement], "width", [this.dtextScaleX + "px"] , "Changing", "timeline");
                }
            }

        }