function(clipboardEvent){
            var clipboardData = clipboardEvent.clipboardData,
            htmlData = clipboardData.getData("text/html"),
            textData = clipboardData.getData("text/plain"),
            i=0,
            imageMime, imageData, imageElement, isImage = false, imageItem;

            if(clipboardData.items &&  (clipboardData.items.length > 0)){//handle image blobs
                for(i=0; i < clipboardData.items.length; i++ ){
                    if((clipboardData.items[i].kind === "file") && (clipboardData.items[i].type.indexOf("image") === 0)){//example type -> "image/png"
                        isImage = true;
                        if(clipboardData.items[i].type === "image/png"){
                            imageItem = clipboardData.items[i];//grab the png image from clipboard
                        }
                        else if(i===0){
                            imageItem = clipboardData.items[i];
                        }
                    }
                }
            }

            if(isImage && imageItem){
                imageMime = imageItem.type;
                imageData = imageItem.getAsFile();
                try{
                    imageElement = this.pasteImageBinary(imageData);
                }catch(e){
                    console.log(""+e.stack);
                }
                this.application.ninja.currentDocument.model.needsSave = true;
            }

            if(!isImage && (!!htmlData || !!textData)){
                try{
                    this.doPasteHtml(htmlData, textData);
                }catch(e){
                    console.log(""+e.stack);
                }
            }
        }