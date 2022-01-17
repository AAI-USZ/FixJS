function() {
            this.workspaceMode = "default";
            console.log("Loading Ninja --> ", this.ninjaVersion);

            this.application.ninja = this;

            this.toolsData.selectedTool = this.toolsData.defaultToolsData[this.application.ninja.toolsData.selectionToolIndex];
            this.toolsData.defaultSubToolsData = this.toolsData.defaultToolsData[this.application.ninja.toolsData.shapeToolIndex].subtools;
            this.toolsData.selectedSubTool = this.toolsData.defaultToolsData[this.application.ninja.toolsData.shapeToolIndex].subtools[1];
            this.toolsData.selectedToolInstance = this.toolsList[this.toolsData.selectedTool.action];

            this.setupGlobalHelpers();

            window.addEventListener("resize", this, false);
            //Prompting the user to make sure data was saved before closing Ninja
            window.onbeforeunload = function () {
                return 'Are you sure you want to close Ninja? Any unsaved data will be lost.';
            };

            this.eventManager.addEventListener("selectTool", this, false);
            this.eventManager.addEventListener("selectSubTool", this, false);
            this.eventManager.addEventListener("executePreview", this, false);

            this.addPropertyChangeListener("appModel.debug", this.toggleDebug, false);
        }