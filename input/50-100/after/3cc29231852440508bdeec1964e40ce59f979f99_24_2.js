function(event) {
                if(!event.wasSetByCode) {
                    if(!this.savedPosition) this.savedPosition = this.dtextScaleY;
                    this.application.ninja.elementMediator.setProperty([this.layerData.stageElement], "height", [this.dtextScaleY + "px"] , "Changing", "timeline");
                }
        }