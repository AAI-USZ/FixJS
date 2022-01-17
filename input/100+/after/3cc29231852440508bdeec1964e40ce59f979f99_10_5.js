f            // optional argument localSpace, if true, puts the top left at (0,0).
            if (arguments.length < 2)  localSpace = false;

            var bounds, left, top, w, h;
            if(elt.elementModel.getProperty("offsetCache")) {
                left = elt.elementModel.getProperty("offsetLeft");
                top = elt.elementModel.getProperty("offsetTop");
                w = elt.elementModel.getProperty("offsetWidth");
                h = elt.elementModel.getProperty("offsetHeight");
            } else {
                left    = elt.offsetLeft;
                top     = elt.offsetTop;
                w       = elt.offsetWidth;
                h       = elt.offsetHeight;
                elt.elementModel.setProperty("offsetLeft", left);
                elt.elementModel.setProperty("offsetTop", top);
                elt.elementModel.setProperty("offsetWidth", w);
                elt.elementModel.setProperty("offsetHeight", h);
                elt.elementModel.setProperty("offsetCache", true);
            }



//            if (elt instanceof SVGSVGElement) {
            if(elt.nodeName.toLowerCase() === "svg") {
                        if(w instanceof SVGAnimatedLength)
                            w = w.animVal.value;
                        if(h instanceof SVGAnimatedLength)
                            h = h.animVal.value;
            }

            bounds = Object.create(Rectangle, {});
            if (localSpace)
            {
                left = 0;
                top = 0;
            }
            bounds.set( left, top,  w, h );

            return bounds;
        }
