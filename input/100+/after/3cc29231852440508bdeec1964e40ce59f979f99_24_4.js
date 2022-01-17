function(event) {
            var prevPosition;

                if(!event.wasSetByCode) {
                    if(this.savedPosition) prevPosition = [this.savedPosition + "px"];

                    this.application.ninja.elementMediator.setProperty([this.layerData.stageElement], "height", [this.dtextScaleY + "px"] , "Change", "timeline", prevPosition);
                    this.savedPosition = null;
                }
        }