function arrayToDefList( listArray, database, baseIndex, paragraphMode, dir )
	{
		if ( !baseIndex )
			baseIndex = 0;
		if ( !listArray || listArray.length < baseIndex + 1 )
			return null;
		var doc = listArray[ baseIndex ].parent.getDocument(),
			retval = new CKEDITOR.dom.documentFragment( doc ),
			rootNode = null,
			currentIndex = baseIndex,
			indentLevel = Math.max( listArray[ baseIndex ].indent, 0 ),
			currentListItem = null,
			paragraphName = ( paragraphMode == CKEDITOR.ENTER_P ? 'p' : 'div' );
		while ( 1 )
		{
			var item = listArray[ currentIndex ];
			if ( item.indent == indentLevel )
			{
				if ( !rootNode || listArray[ currentIndex ].parent.getName() != rootNode.getName() )
				{
					rootNode = listArray[ currentIndex ].parent.clone( 0, 1 );
					dir && rootNode.setAttribute( 'dir', dir );
					retval.append( rootNode );
				}
				currentListItem = rootNode.append( doc.createElement( item.dx ) );
				for ( var i = 0 ; i < item.contents.length ; i++ )
					currentListItem.append( item.contents[i].clone( 1, 1 ) );
				currentIndex++;
			}
			else if ( item.indent == Math.max( indentLevel, 0 ) + 1 )
			{
				var listData = arrayToDefList( listArray, null, currentIndex, paragraphMode );
				currentListItem.append( listData.listNode );
				currentIndex = listData.nextIndex;
			}
			else if ( item.indent == -1 && !baseIndex && item.grandparent )
			{
				currentListItem;
				if ( listNodeNames[ item.grandparent.getName() ] )
					currentListItem = doc.createElement( item.dx );
				else
				{
					// Create completely new blocks here.
					if ( dir || item.element.hasAttributes() ||
						( paragraphMode != CKEDITOR.ENTER_BR && item.grandparent.getName() != 'td' ) )
					{
						currentListItem = doc.createElement( paragraphName );
						item.element.copyAttributes( currentListItem, { type:1, value:1 } );
						dir && currentListItem.setAttribute( 'dir', dir );

						// There might be a case where there are no attributes in the element after all
						// (i.e. when "type" or "value" are the only attributes set). In this case, if enterMode = BR,
						// the current item should be a fragment.
						if ( !dir && paragraphMode == CKEDITOR.ENTER_BR && !currentListItem.hasAttributes() )
							currentListItem = new CKEDITOR.dom.documentFragment( doc );
					}
					else
						currentListItem = new CKEDITOR.dom.documentFragment( doc );
				}

				for ( i = 0 ; i < item.contents.length ; i++ )
					currentListItem.append( item.contents[i].clone( 1, 1 ) );

				if ( currentListItem.type == CKEDITOR.NODE_DOCUMENT_FRAGMENT
					 && currentIndex != listArray.length - 1 )
				{
					var last = currentListItem.getLast();
					if ( last && last.type == CKEDITOR.NODE_ELEMENT
							&& last.getAttribute( 'type' ) == '_moz' )
					{
						last.remove();
					}

					if ( !( last = currentListItem.getLast( nonEmpty )
						&& last.type == CKEDITOR.NODE_ELEMENT
						&& last.getName() in CKEDITOR.dtd.$block ) )
					{
						currentListItem.append( doc.createElement( 'br' ) );
					}
				}

				if ( currentListItem.type == CKEDITOR.NODE_ELEMENT &&
						currentListItem.getName() == paragraphName &&
						currentListItem.$.firstChild )
				{
					currentListItem.trim();
					var firstChild = currentListItem.getFirst();
					if ( firstChild.type == CKEDITOR.NODE_ELEMENT && firstChild.isBlockBoundary() )
					{
						var tmp = new CKEDITOR.dom.documentFragment( doc );
						currentListItem.moveChildren( tmp );
						currentListItem = tmp;
					}
				}

				var currentListItemName = currentListItem.$.nodeName.toLowerCase();
				if ( !CKEDITOR.env.ie && ( currentListItemName == 'div' || currentListItemName == 'p' ) )
					currentListItem.appendBogus();
				retval.append( currentListItem );
				rootNode = null;
				currentIndex++;
			}
			else
				return null;

			if ( listArray.length <= currentIndex || Math.max( listArray[ currentIndex ].indent, 0 ) < indentLevel )
				break;
		}

		// Clear marker attributes for the new list tree made of cloned nodes, if any.
		if ( database )
		{
			var currentNode = retval.getFirst();
			while ( currentNode )
			{
				if ( currentNode.type == CKEDITOR.NODE_ELEMENT )
					CKEDITOR.dom.element.clearMarkers( database, currentNode );
				currentNode = currentNode.getNextSourceNode();
			}
		}

		return { listNode : retval, nextIndex : currentIndex };
	}