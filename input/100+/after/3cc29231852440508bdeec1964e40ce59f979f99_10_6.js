function( elt ) {
            var xOff, yOff, offset, parent, border, pS, bl, bt;

            if(elt.elementModel.getProperty("offsetCache")) {
                xOff = elt.elementModel.getProperty("offsetLeft");
                yOff = elt.elementModel.getProperty("offsetTop");
            } else {
                xOff    = elt.offsetLeft;
                yOff     = elt.offsetTop;
                elt.elementModel.setProperty("offsetLeft", xOff);
                elt.elementModel.setProperty("offsetTop", yOff);
                elt.elementModel.setProperty("offsetCache", true);
            }
            offset = [xOff, yOff];
            parent = this.getOffsetParent(elt);
            if(parent && (parent !== this._stageElement))
            {
                if(parent.elementModel.getProperty("border")) {
                    border = parent.elementModel.getProperty("border");
                    bl = parent.elementModel.getProperty("border-left-width");
                    bt = parent.elementModel.getProperty("border-top-width");
                } else {
                    if(elt.ownerDocument.defaultView) {
                        pS = elt.ownerDocument.defaultView.getComputedStyle(parent, null);
                        border = parseInt(pS.getPropertyValue("border"));
                        bl = parseInt(pS.getPropertyValue("border-left-width"));
                        bt = parseInt(pS.getPropertyValue("border-top-width"));
                        parent.elementModel.setProperty("border", border);
                        parent.elementModel.setProperty("border-left-width", bl);
                        parent.elementModel.setProperty("border-top-width", bt);
                    }
                }

                if(border) {
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