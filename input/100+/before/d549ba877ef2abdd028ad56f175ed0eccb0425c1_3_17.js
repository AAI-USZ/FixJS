function _correctRangeOld ( range ) {		

		var startContainer = range.startContainer,

		    endContainer = range.endContainer,

			startOffset = range.startOffset,

		    endOffset = range.endOffset,

			newStartContainer,

		    newEndContainer,

			newStartOffset = startOffset,

			newEndOffset = endOffset;

		

		if ( _isSelectionStopNode( endContainer ) ) {

			if ( endOffset == 0 ) {

				newEndContainer = _moveBackwards( endContainer );

			}

		} else if ( isVoidElement(

			endContainer.childNodes[ endOffset ? endOffset - 1 : 0 ] ) ) {

			if ( endOffset == 0 ) {

				newEndContainer = _getSelectionEndNode(

					_moveBackwards( endContainer )

				);

				newEndOffset = newEndContainer.length;

			}

		} else if ( _isPositionAtNodeEnd ( endContainer, endOffset ) ) {

			// The endOffset is at the end of a node on which we cannot stop

			// at. We will therefore search for an appropriate node nested

			// inside this node at which to stop at

			newEndContainer = endContainer; 

		} else if ( endContainer.children &&

					endContainer.children.length ) {

			//debugger;

			newEndContainer = endContainer.children[ endOffset ];

			if ( _isFlowNode( newEndContainer ) ) {

				newEndContainer = endContainer;

				newEndOffset = endOffset;

			}

			//newEndContainer = endContainer.children[

			//	endContainer.children.length - 1

			//];

		} else if ( _moveBackwards( endContainer ) ) {

			newEndContainer = _moveBackwards( endContainer );

		}

		

		//debugger;

		

		newEndContainer = _getSelectionEndNode( newEndContainer );

		

		if ( newEndContainer ) {

			newEndOffset = newEndContainer.length;

		} else {

			newEndContainer = range.endContainer;

		}

		

		// rule:

		//		IF the end position is at the start of the end container

		//		THEN look for its previous relative node that is a phrase element

		//		WHICH would enable us to have an end positon that is greater than zero.

		//		IF we cannot find such a cousin node to be our new end container

		//		THEN leave the end position where it was.

		//

		// ie:

		//		[ '[foo<span>]bar</span>baz', '[foo]<span>bar</span>baz' ]

		//		[ '{foo<span>}bar</span>baz', '[foo]<span>bar</span>baz' ]

		//		[ 'foo{<span>}bar</span>baz', 'foo[]<span>bar</span>baz' ]

		//		[ 'foo<span><b>{<b><b>]bar</b></b></b></span>baz', 'foo[]<span><b><b><b>bar</b></b></b></span>baz' ]

		//		[ 'foo<i></i>{<span><b><b>}bar</b></b></span>baz', 'foo[]<i></i><span><b><b>bar</b></b></span>baz' ]

		//		[ 'foo<i>a</i>{<span><b><b>}bar</b></b></span>baz', 'foo<i>a[]</i><span><b><b>bar</b></b></span>baz' ]

		//		[ 'test<span>{<span><b><b>}bar</b></b></span>baz</span>', 'test[]<span><span><b><b>bar</b></b></span>baz</span>' ]

		//

		// nb:

		// 		Notice that in all cases below, we cannot get a start position that is greater than zero

		// 		and therefore we leave the end position where it was

		//

		//		[ '{<span><b><b>}bar</b></b></span>baz', '<span><b><b>[]bar</b></b></span>baz' ]

		//		[ '<i></i>{<span><b><b>}bar</b></b></span>baz', '<i></i><span><b><b>[]bar</b></b></span>baz' ]

		//		[ '<span>{<span><b><b>}bar</b></b></span>baz</span>', '<span><span><b><b>[]bar</b></b></span>baz</span>' ]

		//

		

		if ( newEndOffset == 0 && !_isFlowNode( newEndContainer ) ) {

			var prev = _getSelectionEndNode( _moveBackwards( newEndContainer ) );

			

			if ( prev ) {

				newEndContainer = prev;

				newEndOffset = prev.length;

			} else {

				var next = _getSelectionStartNode( newEndContainer );

				if ( next ) {

					newEndContainer = next;

					newEndOffset = 0;

				}

			}

			

			// TODO: !isVoidElement && !_isFlowNode

		}

		

		if ( startContainer == newEndContainer ) {

			// logic:

			//		If the startContainer is the same as the *corrected*

			//		endContainer (newEndContainer), then we can infere that the

			//		corrected endContainer was the most suitable container to

			//		place the end selection position, and it is therefore also

			//		the nearest best container for the start position. The only

			//		things that differ are the start and end positions.

			//		Therefore do nothing.

			// ie:

			// 		Ensures that 'foo<span>bar[</span>]baz' is corrected to

			//		'foo<span>bar[]</span>baz'

			

			if ( newEndOffset == 0 ) {

				newStartContainer = _getSelectionStartNode( newEndContainer );

				if ( newStartContainer ) {

					newEndContainer = newStartContainer;

				}

			}

		} else if ( _isPositionAtNodeEnd( startContainer, startOffset ) &&

					startContainer.firstChild == newEndContainer ) {

			range.startContainer = newEndContainer;

			newStartOffset = newEndOffset;

		} else if ( endOffset == 0 &&

					//startContainer.childNodes.length &&

					startContainer.childNodes[ startOffset ] == endContainer &&

					_moveBackwards( startContainer.childNodes[ startOffset ] ) ) {

			// Corrects 'foo{<span>}bar</span>baz' to 'foo[]<span>bar</span>baz'

			// by trying to find the nearest position to the original start

			// node. We do this by jumping to the previousSibling and

			// traversing to the end of it

			newStartContainer = _getSelectionEndNode(

				_moveBackwards( startContainer.childNodes[ startOffset ] )

			);

			

			if ( newStartContainer ) {

				range.startContainer = newStartContainer;

				newStartOffset = newStartContainer.length;

				newStartContainer = null; // Prevent going into _getSelectionStartNode. Should we just return here?

			}

		} else if ( startOffset == startContainer.length &&

					isVoidElement( startContainer.nextSibling ) ) {

			//debugger;

		} else if ( _isPositionAtNodeEnd( startContainer, startOffset ) &&

					_moveForwards( startContainer ) ) {

			newStartContainer = _moveForwards( startContainer );

		} else if ( startContainer.childNodes.length &&

					!isVoidElement( startContainer.childNodes[ startOffset ] ) ) {

			newStartContainer = startContainer.childNodes[ startOffset ];

		}

		

		newStartContainer = _getSelectionStartNode( newStartContainer );

		

		if ( newStartContainer ) {

			newStartOffset = 0;

		} else {

			newStartContainer = range.startContainer;

		}

		

		// rule:

		//		The end position cannot preceed the start position.

		//		If we detect such a case, then we collapse the selection round

		//		the end position

		//

		// reference:

		//		http://www.w3.org/TR/DOM-Level-3-Core/core.html#Node3-compareDocumentPosition

		//		Bits	Number	Meaning

		//		------  ------  -------

		//		000000	0		Elements are identical.

		//		000001	1		The nodes are in different documents (or one is outside of a document).

		//		000010	2		Node B precedes Node A.

		//		000100	4		Node A precedes Node B.

		//		001000	8		Node B contains Node A.

		//		010000	16		Node A contains Node B.

		//		100000	32		For private use by the browser.

		var posbits = compareDocumentPosition( newStartContainer, newEndContainer );

		

		if ( posbits & 2 && !( posbits & 8 ) ) {

			range.startOffset = newEndOffset;

			range.startContainer = newEndContainer;

			range.endOffset = newEndOffset;

			range.endContainer = newEndContainer;

			

			return range;

		}

		

		while ( !_isFlowNode( newStartContainer ) &&

				newStartContainer == newEndContainer &&

				newStartOffset == newEndOffset - 1 &&

				!_isSelectionStopNode( newStartContainer ) &&

				!isVoidElement( newStartContainer.childNodes[ newStartOffset ] ) ) {

			// We have this sort of situation: 'foo{<span><br></span>}baz'

			newStartContainer = newEndContainer = newStartContainer.childNodes[ newStartOffset ];

			newStartOffset = 0;

			if ( newEndContainer.childNodes ) {

				newEndOffset = newEndContainer.childNodes.length;

			} else {

				newEndOffset = newEndContainer.length;

			}

		}

		

		// Fix position around void elements

		

		if ( newStartContainer != newEndContainer || newStartOffset != newEndOffset ) {

			

			if ( newEndOffset == 0 && isVoidElement( newEndContainer.previousSibling ) ) {

				

				var index = getIndexOfChildNode(

					newEndContainer.parentNode, newEndContainer.previousSibling

				);

				

				if ( index != -1 ) {

					newEndContainer = newEndContainer.parentNode;

					newEndOffset = index + 1;

				}

				

			}

			

			if ( newStartContainer.length &&

				 newStartContainer.length == newStartOffset &&

				 isVoidElement( newStartContainer.nextSibling ) ) {

				

				var index = getIndexOfChildNode(

					newStartContainer.parentNode, newStartContainer.nextSibling

				);

				

				if ( index != -1 ) {

					newStartContainer = newStartContainer.parentNode;

					newStartOffset = index;

				}

				

			}

		} else {

			//debugger;

			//newStartContainer = _getSelectionStartNode( newStartContainer );

			//if ( newStartContainer ) {

			//	newEndContainer = newStartContainer;

			//	newEndOffset = newStartOffset = 0;

			//}

		}

		

		// 'foo<span>{}<br></span>baz', 'foo[]<span><br></span>baz'

		// 'foo<span><br>{}</span>baz', 'foo<span><br></span>[]baz'

		if ( newStartOffset == 0 &&

			 newStartContainer == newEndContainer &&

			 isVoidElement( newStartContainer.firstChild ) ) {

			

			newStartContainer = _getSelectionEndNode(

				_moveBackwards( newStartContainer )

			);

			newStartOffset = newStartContainer.length;

		

		} else if ( newStartOffset == newStartContainer.childNodes.length &&

					isVoidElement( newStartContainer.lastChild ) ) {

			

			newStartContainer = _moveForwards( newStartContainer );

			newStartOffset = 0;

			

		}

		

		if ( newEndOffset == 0 &&

			 newEndContainer.previousSibling &&

			 isVoidElement( newEndContainer.firstChild ) ) {

			

			newEndContainer = newEndContainer.previousSibling;

			newEndOffset = newEndContainer.length;

			

		} else if ( newEndContainer.nextSibling &&

					newEndOffset == newEndContainer.childNodes.length &&

					isVoidElement( newEndContainer.lastChild ) ) {

			

			newEndContainer = newEndContainer.nextSibling;

			newEndOffset = 0;

			

		}

		

		if ( newStartContainer != newEndContainer ) {

			if ( newStartContainer.length == newStartOffset ) {

				var next = _moveForwards( newStartContainer );

			} else {

				var next = newStartContainer.childNodes[ newStartOffset ];

			}

			

			if ( next ) {

				if ( next.firstChild == next.lastChild && isVoidElement( next.firstChild ) ) {

					newStartContainer = next;

					newStartOffset = 0;

				}

			}

			

			if ( newEndOffset == 0 ) {

				var prev = _moveBackwards( newEndContainer );

				

				if ( prev ) {

					if ( prev.firstChild == prev.lastChild && isVoidElement( prev.firstChild ) ) {

						newEndContainer = prev;

						newEndOffset = 1;

					}

				}

			}

		}

		

		// [ 'foo[}<br>baz', 'foo[]<br>baz' ],

		// [ 'foo<br>{]baz', 'foo<br>[]baz' ],

		if ( newStartContainer == newEndContainer &&

			 newStartOffset == newEndOffset &&

			 newStartContainer.childNodes.length &&

			 !_isSelectionStopNode( newStartContainer ) ) {

			newStartContainer = newStartContainer.childNodes[ newStartOffset ];

			if ( isVoidElement( newStartContainer ) ) {

				newStartContainer = newStartContainer.previousSibling;

				newStartOffset = newEndOffset = newStartContainer.length;

			} else {

				newStartOffset = newEndOffset = 0;

			}

			

			newEndContainer = newStartContainer;

		}

		

		// Satisfies: '<p>[foo</p><p>]bar</p><p>baz</p>', '<p>[foo</p><p>}bar</p><p>baz</p>'

		if ( _isFlowNode( newEndContainer.parentNode ) &&

			 newEndContainer.parentNode.firstChild == newEndContainer &&

			 newEndOffset == 0 ) {

			//debugger;

			newEndContainer = newEndContainer.parentNode,

			newEndOffset = 0;

		}

		

		if ( !_isFlowNode( newEndContainer ) && // make sure we don't do correct this: </p>}foo to </p>]foo

			 !_isSelectionStopNode( newEndContainer ) &&

			 _isPositionAtNodeEnd( newEndContainer, newEndOffset + 1 ) &&

			 !isVoidElement( newEndContainer.childNodes[ newEndOffset ].previousSibling ) ) {

			newEndContainer = newEndContainer.childNodes[ newEndOffset ];

			newEndOffset = 0;

		}

		

		if ( newEndContainer ) {

			range.endContainer = newEndContainer;

			range.endOffset = newEndOffset;

		}

		

		if ( newStartContainer ) {

			range.startContainer = newStartContainer;

			range.startOffset = newStartOffset;

		}
		

		return range;

	};
