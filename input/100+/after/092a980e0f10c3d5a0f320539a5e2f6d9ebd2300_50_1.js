function _extractAttrVal(ctx) {
        var attrValue = ctx.token.string;
        var startChar = attrValue.charAt(0);
        var endChar = attrValue.charAt(attrValue.length - 1);
        var offset = _offsetInToken(ctx);
        
        //If this is a fully quoted value, return the whole
        //thing regardless of position
        if (attrValue.length > 1 &&
                (startChar === "'" || startChar === "\"") &&
                endChar === startChar) {
            //strip the quotes and return;
            attrValue = attrValue.substring(1, attrValue.length - 1);
            offset = offset - 1 > attrValue.length ? attrValue.length : offset - 1;
            return {val: attrValue, offset: offset};
        }
        
        //The att value it getting edit in progress. There is possible extra
        //stuff in this token state since the quote isn't closed, so we assume
        //the stuff from the quote to the current pos is definitely in the attribute 
        //value.
        if (offset > 0) {
            attrValue = attrValue.substring(0, offset);
        }
        
        //If the attrValue start with a quote, trim that now
        startChar = attrValue.charAt(0);
        if (startChar === "'" || startChar === "\"") {
            attrValue = attrValue.substring(1);
            offset--;
        }
        
        return {val: attrValue, offset: offset};
    }