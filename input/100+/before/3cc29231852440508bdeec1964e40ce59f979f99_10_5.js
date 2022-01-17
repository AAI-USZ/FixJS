f            // optional argument localSpace, if true, puts the top left at (0,0).
            if (arguments.length < 2)  localSpace = false;

            var bounds;
            var left    = elt.offsetLeft,
                top     = elt.offsetTop,
                w       = elt.offsetWidth,
                h       = elt.offsetHeight;

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
