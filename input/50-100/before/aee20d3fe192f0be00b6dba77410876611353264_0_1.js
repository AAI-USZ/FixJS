function getOffsetOf (child, parent) {
        var result = { x: 0, y: 0 };
        //TODO: uses jQuery.contains - might wanna lose it later
        if ( ! child || ! parent || child === parent || ! $.contains(parent, child) ) return result;
        do {
            result.x += child.offsetLeft;
            result.y += child.offsetTop;
            if ( child === parent ) break;
        } while ( child = child.offsetParent );
        return result;
    }