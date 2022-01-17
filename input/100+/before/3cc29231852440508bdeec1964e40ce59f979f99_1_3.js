function(htmlData, textData){
            var i=0, j=0,
                pasteDataObject=null,
                pastedElements = [],
                node = null, nodeList = null,
                styles = null,
                divWrapper = null,
                spanWrapper = null,
                metaEl = null,
                self = this;

            if(htmlData){

                //cleanse HTML

                htmlData.replace(/[<script]/g," ");

                this.application.ninja.selectedElements.length = 0;
                NJevent("selectionChange", {"elements": this.application.ninja.selectedElements, "isDocument": true} );

                try{
                    nodeList = ClipboardUtil.deserializeHtmlString(htmlData);//this removes html and body tags
                }
                catch(e){
                    console.log(""+e.stack);
                }

                for(i=0; i < nodeList.length; i++){
                    if(nodeList[i].tagName === "META") {
                        nodeList[i] = null;
                    }
                    else if (nodeList[i].tagName === "CANVAS"){
                        //can't paste external canvas for lack of all metadata
                        nodeList[i] = null;
                    }
                    else if((nodeList[i].nodeType === 3) || (nodeList[i].tagName === "A")){
                        node = nodeList[i].cloneNode(true);

                        divWrapper = document.application.njUtils.make("div", null, this.application.ninja.currentDocument);
                        spanWrapper = document.application.njUtils.make("span", null, this.application.ninja.currentDocument);
                        spanWrapper.appendChild(node);
                        divWrapper.appendChild(spanWrapper);
                        styles = {"position":"absolute", "top":"100px", "left":"100px"};

                        this.pastePositioned(divWrapper, styles);

                        nodeList[i] = null;
                        pastedElements.push(divWrapper);

                    }else if(nodeList[i].tagName === "SPAN"){
                        node = nodeList[i].cloneNode(true);

                        divWrapper = document.application.njUtils.make("div", null, this.application.ninja.currentDocument);
                        divWrapper.appendChild(node);
                        styles =  {"position":"absolute", "top":"100px", "left":"100px"};

                        this.pastePositioned(divWrapper, styles);

                        nodeList[i] = null;
                        pastedElements.push(divWrapper);
                    }
                    else {
                        node = nodeList[i].cloneNode(true);

                        //get class string while copying .... generate styles from class
                        styles = {"position":"absolute", "top":"100px", "left":"100px"};

                        this.pastePositioned(node, styles);

                        nodeList[i] = null;
                        pastedElements.push(node);
                    }

                }

                nodeList = null;


            }else if(textData){
                node = ClipboardUtil.deserializeHtmlString("<div><span>"+ textData +"</span></div>")[0];
                styles = {"position":"absolute", "top":"100px", "left":"100px"};
                this.pastePositioned(node, styles);
            }

            NJevent("elementAdded", pastedElements);
            this.application.ninja.currentDocument.model.needsSave = true;

        }