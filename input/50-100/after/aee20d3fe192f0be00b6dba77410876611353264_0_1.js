function getOffsetOf (child, parent) {
        var result = { x: 0, y: 0 };
        //TODO: uses jQuery.contains - might wanna lose it later
        if ( ! child || ! parent || child === parent || ! $.contains(parent, child) ) return result;
        do {
            if ( child === parent ) break;
            result.x += child.offsetLeft;
            result.y += child.offsetTop;
        } while ( child = child.offsetParent );
        return result;
    }