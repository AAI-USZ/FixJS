function() {
            this.init();
            dojo.subscribe("/animwidget/initStage", this, "onInitStage");
            dojo.subscribe("/animwidget/updateObject", this, "onUpdateObject");
            dojo.subscribe("/animwidget/addObject", this, "onAddObject");
            dojo.subscribe("/layerwidget/updateLayerPosition", this, "onUpdateLayerPosition");
            dojo.subscribe("/layerwidget/updateObject", this, "onChangeObject");
            dojo.subscribe("/keyframewidget/updateinbetweens", this, "updateInbetweens");
            dojo.subscribe("/scenewidget/activatescene", this, "onActivateScene");
            dojo.subscribe("/scenewidget/deletescene", this, "onDeleteScene");
            
            if (!this.stageInitialized) {
                dojo.publish("/animtimelinewidget/requestInitStage", []);
            }
            dojo.connect(dojo.byId("playAnimation"), "click", this, this.onPlayAnimation);
            dojo.connect(dojo.byId("stopAnimation"), "click", this, this.onStopAnimation);
            
        }