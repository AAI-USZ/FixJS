function(event) {
                if(!event.wasSetByCode) {
                    if(!this.savedPosition) this.savedPosition = this.dtextScaleX;
                    this.application.ninja.elementMediator.setProperty([this.layerData.stageElement], "width", [this.dtextScaleX + "px"] , "Changing", "timeline");
                }
        }