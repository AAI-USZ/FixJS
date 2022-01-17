function wrapWord(text) {
        if (!text.length) { // IE 9
            return null;
        }
        var shadow = shadowNode.cloneNode(false),
            orig = origNode.cloneNode(false),
            copy = copyNode.cloneNode(false);
            
        shadow.appendChild(copy);
        shadow.appendChild(orig);
        
        orig.appendChild(document.createTextNode(text));
        copy.appendChild(document.createTextNode(text));

        return shadow;
    }