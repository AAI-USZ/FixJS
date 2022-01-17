function(dom) {
        var newDom = document.createElement("span");
        var children = dom.children;
        var offset, id, span, color;
        for (var i = 0; i < children.length; i++) {
            var textBody = children[i].textContent || children[i].innerText;
            if (children[i]['className'] === 'location-id') {
                id = textBody;
            }
            if (children[i]['className'] === 'location-offset') {
                offset = textBody;
            }
            if (children[i]['className'] === 'location-span') {
                span = textBody;
            }
            if (children[i]['className'] === 'location-color') {
                color = textBody;
            }

        }
         if(!color) { color = "red"; }//FIXME!
	  // console.log("_rewriteLocation " + color);
        return this.createLocationHyperlink({ id: id,
                                              offset: parseInt(offset),
                                              span: parseInt(span),
					      color: color});
    }