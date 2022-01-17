function(clipboardEvent){
            if(this.application.ninja.currentDocument.currentView === "code") return;

            // Don't do anything if an input or other control is focused
            if(document.activeElement.nodeName !== "BODY") {
                return;
            }

            //perform clipboard operations only if selection tool is selected
            if(this.application.ninja.toolsData.defaultToolsData[this.application.ninja.toolsData.selectionToolIndex].selected === false){
                return;
            }

            if(this.clipboardContext === "stage"){
                ElementsClipboardAgent.cut(clipboardEvent);
            }

            clipboardEvent.preventDefault();
        }