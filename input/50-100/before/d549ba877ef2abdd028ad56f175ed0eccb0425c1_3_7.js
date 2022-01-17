function _moveForwards ( node ) {

		if ( !node || isVoidElement( node ) || _isFlowNode( node ) ) {

			return null;

		}

		

		if ( node.nextSibling ) {

			return node.nextSibling;

		}

		

		if ( node.parentNode ) {

			return _moveForwards( node.parentNode );

		}

		

		return null;

	}