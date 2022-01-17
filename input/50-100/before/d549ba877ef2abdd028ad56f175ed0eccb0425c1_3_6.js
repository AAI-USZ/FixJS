function _moveBackwards ( node ) {

		if ( !node || isVoidElement( node ) || _isFlowNode( node ) || GENTICS.Utils.Dom.isEditingHost( node ) ) {

			return null;

		}

		

		if ( node.previousSibling ) {

			return node.previousSibling;

		}

			

		if ( node.parentNode ) {

			return _moveBackwards( node.parentNode );

		}

		

		return null;

	}