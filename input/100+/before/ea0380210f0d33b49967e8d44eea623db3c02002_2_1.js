function(clipboardEvent){
            if(!this.application.ninja.currentDocument
                || (this.application.ninja.currentDocument && this.application.ninja.currentDocument.currentView === "code")){

                return;
            }//for design view only

            // Don't do anything if an input or other control is focused
            if(document.activeElement.nodeName !== "BODY") {
                return;
            }

            if(this.clipboardContext === "stage"){
                ElementsClipboardAgent.copy(clipboardEvent);
            }

            clipboardEvent.preventDefault();
        }