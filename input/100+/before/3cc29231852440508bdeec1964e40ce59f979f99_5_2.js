function(clipboardEvent){
            if(this.application.ninja.currentDocument.currentView === "code") return;

            // Don't do anything if an input or other control is focused
            if(document.activeElement.nodeName !== "BODY") {
                return;
            }

            if(this.clipboardContext === "stage"){
                ElementsClipboardAgent.cut(clipboardEvent);
            }

            clipboardEvent.preventDefault();
        }