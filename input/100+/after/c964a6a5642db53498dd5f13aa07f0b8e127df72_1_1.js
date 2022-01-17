function () {
        var range = getSelection(),
            node = range.startContainer,
            parent;
        if ( node.nodeType === TEXT_NODE ) {
            node = node.parentNode;
        }
        // If focussed in empty inline element
        if ( node.isInline() && !node.textContent ) {
            do {
                parent = node.parentNode;
            } while ( parent.isInline() &&
                !parent.textContent && ( node = parent ) );
            range.setStart( parent,
                indexOf.call( parent.childNodes, node ) );
            range.collapse( true );
            parent.removeChild( node );
            if ( !parent.isBlock() ) {
                parent = parent.getPreviousBlock();
            }
            parent.fixCursor();
            range.moveBoundariesDownTree();
            setSelection( range );
            updatePath( range );
        }
    }