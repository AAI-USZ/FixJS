function () {
        var range = getSelection(),
            node = range.startContainer,
            parent;
        node = node.nodeType === TEXT_NODE ?
            node.length ? null : node.parentNode :
            node.isInline() && !node.textContent ? node : null;

        // If focussed in empty inline element
        if ( node ) {
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