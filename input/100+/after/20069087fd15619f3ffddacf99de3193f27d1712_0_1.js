function(contentHTML, size, options) {

    

    var w, h;

    

    // create temp container div with restricted size

    var container = document.createElement("div");

    container.style.visibility = "hidden";

        

    var containerElement = (options && options.containerElement) 

    	? options.containerElement : document.body;



    //fix a dimension, if specified.

    if (size) {

        if (size.w) {

            w = size.w;

            container.style.width = w + "px";

        } else if (size.h) {

            h = size.h;

            container.style.height = h + "px";

        }

        container.style.overflow = "hidden";

    }



    //add css classes, if specified

    if (options && options.displayClass) {

        container.className = options.displayClass;

    }

    

    // create temp content div and assign content

    var content = document.createElement("div");

    content.innerHTML = contentHTML;

    

    // we need overflow visible when calculating the size

    content.style.overflow = "visible";

    if (content.childNodes) {

        for (var i=0, l=content.childNodes.length; i<l; i++) {

            if (!content.childNodes[i].style) continue;

            content.childNodes[i].style.overflow = "visible";

        }

    }

    

    // add content to restricted container 

    container.appendChild(content);

    

    // append container to body for rendering

    containerElement.appendChild(container);

    

    // Opera and IE7 can't handle a node with position:aboslute if it inherits

    // position:absolute from a parent.

    var parentHasPositionAbsolute = false;

    var parent = container.parentNode;

    while (parent && parent.tagName.toLowerCase()!="body") {

        var parentPosition = OpenLayers.Element.getStyle(parent, "position");

        if(parentPosition == "absolute") {

            parentHasPositionAbsolute = true;

            break;

        } else if (parentPosition && parentPosition != "static") {

            break;

        }

        parent = parent.parentNode;

    }



    if(!parentHasPositionAbsolute) {

        container.style.position = "absolute";

    }

    

    // calculate scroll width of content and add corners and shadow width

    if (!w) {

        w = Math.ceil(parseFloat(OpenLayers.Element.getStyle(content,"width")));

        if (!w) {

            w = parseInt(content.scrollWidth);

        }

    

        // update container width to allow height to adjust

        container.style.width = w + "px";

    }        

    // capture height and add shadow and corner image widths

    if (!h) {

        h = Math.ceil(parseFloat(OpenLayers.Element.getStyle(content,"height")));

        if (!h){

            h = parseInt(content.scrollHeight);

        }

    }



    // remove elements

    container.removeChild(content);

    containerElement.removeChild(container);

    

    return new OpenLayers.Size(w, h);

}