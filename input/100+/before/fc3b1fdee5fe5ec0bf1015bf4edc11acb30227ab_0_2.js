function(aLocation, anchorBodyDom) {
        console.log("aLocation is ", aLocation);
        if (! anchorBodyDom) {
            anchorBodyDom = document.createTextNode(
                "at: line " + aLocation.line + 
                    ", column " + aLocation.column +
                    ", in " + aLocation.id);
        }
        var para = document.createElement('p');
        para.className = 'location-paragraph';
        var anchor = document.createElement("a");
        anchor['href'] = "#";
        anchor['onclick'] = makeHighlighterLinkFunction(
            this, aLocation);
        anchor.appendChild(anchorBodyDom);
        para.appendChild(anchor);
        return para;
    }