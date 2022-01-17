function( elt ) {
            var xOff = elt.offsetLeft,  yOff = elt.offsetTop;
        //        if (elt.__ninjaXOff)  xOff = elt.__ninjaXOff;
        //        if (elt.__ninjaYOff)  yOff = elt.__ninjaYOff;
            var offset = [xOff, yOff];
            if(elt.offsetParent && (elt.offsetParent !== this._stageElement))
            {
                var pS = elt.ownerDocument.defaultView.getComputedStyle(elt.offsetParent);

                var border = parseInt(pS.getPropertyValue("border"));

                if(border)
                {
                    var bl = parseInt(pS.getPropertyValue("border-left-width")),
                        bt = parseInt(pS.getPropertyValue("border-top-width"));

                    offset[0] += bl;
                    offset[1] += bt;
                }
            }

            if(elt === this._stageElement)
            {
                // TODO - Call a routine from the user document controller to get the offsets/margins
                // Once we expose the document controller to ViewUtils
                offset[0] += this.application.ninja.stage._userContentLeft;
                offset[1] += this.application.ninja.stage._userContentTop;
            }

            return offset;
        }