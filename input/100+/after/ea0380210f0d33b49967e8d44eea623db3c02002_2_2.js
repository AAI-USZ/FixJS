function(clipboardEvent){
            var clipboardData = clipboardEvent.clipboardData,
                ninjaData = clipboardData.getData("ninja");

            if(!this.application.ninja.currentDocument
                || (this.application.ninja.currentDocument && this.application.ninja.currentDocument.currentView === "code")){

                return;
            }//for design view only

            // Don't do anything if an input or other control is focused
            if(document.activeElement.nodeName !== "BODY") {
                return;
            }

            //perform clipboard operations only if selection tool is selected
            if(this.application.ninja.toolsData.defaultToolsData[this.application.ninja.toolsData.selectionToolIndex].selected === false){
                return;
            }

            //TODO: return if stage is not focussed

            if(this.clipboardContext === "stage"){
                if(ninjaData){
                    ElementsClipboardAgent.pasteInternal();
                }
                else{
                    ExternalAppsClipboardAgent.paste(clipboardEvent);
                }
            }

            clipboardEvent.preventDefault();
        }