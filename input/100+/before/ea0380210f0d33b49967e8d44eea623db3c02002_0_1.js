function(clipboardEvent){
            var clipboardData = clipboardEvent.clipboardData,
            htmlData = clipboardData.getData("text/html"),
            textData = clipboardData.getData("text/plain"),
            i=0,
            imageMime, imageData, imageElement;

            //handle image blobs
            if(clipboardData.items &&  (clipboardData.items.length > 0)){
                for(i=0; i < clipboardData.items.length; i++ ){
                    if((clipboardData.items[i].kind === "file") && (clipboardData.items[i].type.indexOf("image") === 0)){//example type -> "image/png"
                        imageMime = clipboardData.items[i].type;
                        imageData = clipboardData.items[i].getAsFile();
                        try{
                            imageElement = this.pasteImageBinary(imageData);
                        }catch(e){
                            console.log(""+e.stack);
                        }
                        this.application.ninja.selectionController.selectElements(imageElement);
                        this.application.ninja.currentDocument.model.needsSave = true;

                    }
                }
            }

            try{
                if(!!htmlData || !!textData){
                    this.pasteHtml(htmlData, textData);
                }
            }catch(e){
                console.log(""+e.stack);
            }

        }