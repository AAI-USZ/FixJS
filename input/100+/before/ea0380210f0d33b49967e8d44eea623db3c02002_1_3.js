function(element, styles, fromCopy){// for now can wok for both in-place and centered paste
            var modObject = [], x,y, newX, newY, counter, self = this;

            if((typeof fromCopy === "undefined") || (fromCopy && fromCopy === true)){
                counter = this.pasteCounter;
            }else{
                counter = this.pasteCounter - 1;
            }

            x = styles ? ("" + styles.left + "px") : "100px";
            y = styles ? ("" + styles.top + "px") : "100px";
            newX = styles ? ("" + (styles.left + (25 * counter)) + "px") : "100px";
            newY = styles ? ("" + (styles.top + (25 * counter)) + "px") : "100px";

            var addDelegate = this.application.ninja.elementMediator.addDelegate;
            this.application.ninja.elementMediator.addDelegate = null;
            if(!styles || (styles && !styles.position)){
                this.application.ninja.elementMediator.addElements(element, null, false);
            }else if(styles && (styles.position === "absolute")){
                if((element.tagName === "IMG") || (element.getAttribute("type") === "image/svg+xml")){
                    element.onload = function(){
                        element.onload = null;
                        //refresh selection
                        self.application.ninja.stage.needsDraw = true;
                    }
                }

                this.application.ninja.elementMediator.addElements(element, {"top" : newY, "left" : newX}, false);//displace
            }
            this.application.ninja.elementMediator.addDelegate = addDelegate;
        }