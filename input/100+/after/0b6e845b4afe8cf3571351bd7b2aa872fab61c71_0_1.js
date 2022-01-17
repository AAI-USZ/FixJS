function(htmlData, textData){
            var divWrapper = null, data = null, theclass, height, width;

            htmlData = this.sanitize(htmlData);
            textData = this.sanitize(textData);

            data = htmlData ? htmlData : textData;

            if (data && data.length) {
                divWrapper = document.application.njUtils.make("div", null, this.application.ninja.currentDocument);
                this.application.ninja.elementMediator.addElements(divWrapper, {"height": "68px",
                                                                                "left": "0px",
                                                                                "position": "absolute",
                                                                                "top": "0px",
                                                                                "width": "161px"}, false/*notify*/, false/*callAddDelegate*/);

                divWrapper.innerHTML = data;

                //hack to set the wrapper div's height and width as per the pasted content
                theclass = divWrapper.getAttribute("class");
                //temporarily remove the class to find the computed styles for the pasted content
                if(theclass){
                    divWrapper.removeAttribute("class");
                }
                height = divWrapper.ownerDocument.defaultView.getComputedStyle(divWrapper).getPropertyValue("height");
                width = divWrapper.ownerDocument.defaultView.getComputedStyle(divWrapper).getPropertyValue("width");

                divWrapper.setAttribute("class", theclass);

                this.application.ninja.stylesController.setElementStyle(divWrapper, "height", height);
                this.application.ninja.stylesController.setElementStyle(divWrapper, "width", width);
                //-end hack

                NJevent("elementAdded", divWrapper);

                this.application.ninja.currentDocument.model.needsSave = true;
            }
        }