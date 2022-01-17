function(dom) {
        var newDom = document.createElement("span");
        var children = dom.children;
        var offset, id, span, line, column, color;
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
            if (children[i]['className'] === 'location-line') {
                line = textBody;
            }
            if (children[i]['className'] === 'location-column') {
                column = textBody;
            }
            if (children[i]['className'] === 'location-color') {
                color = textBody;
            }

        }
         if(!color) { color = "red"; }//FIXME!
        return this.createLocationHyperlink({ id: id,
                                              offset: parseInt(offset),
                                              line: parseInt(line),
                                              column: parseInt(column),
                                              span: parseInt(span),
					      color: color});
    }