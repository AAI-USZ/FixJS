function onWindowScroll( floatingmenu ) {
		if ( !Aloha.activeEditable ) {
			return;
		}

		var element = floatingmenu.obj;
		var editablePos = Aloha.activeEditable.obj.offset();
		var isTopAligned = floatingmenu.behaviour === 'topalign';
		var isManuallyPinned = floatingmenu.pinned
							 && ( parseInt( element.css( 'left' ), 10 )
								  != ( editablePos.left
									   + floatingmenu.horizontalOffset
									 ) );

		if ( isTopAligned && isManuallyPinned ) {
			return;
		}

		var floatingmenuHeight = element.height();
		var scrollTop = jQuery(document).scrollTop();

		// This value is what the top position of the floating menu
		// *would* be if we tried to position it above the active
		// editable.
		var floatingmenuTop = editablePos.top - floatingmenuHeight
							+ floatingmenu.marginTop;

		// The floating menu does not fit in the space between the top
		// of the viewport and the editable, so position it at the top
		// of the viewport, and over the editable.
		if ( scrollTop > floatingmenuTop ) {
			editablePos.top = isTopAligned
							? scrollTop + floatingmenu.marginTop
							: floatingmenu.marginTop;

		// There is enough space on top of the editable to fit the
		// entire floating menu, so we do so.
		} else if ( scrollTop <= floatingmenuTop ) {
			editablePos.top -= floatingmenuHeight
							 + ( isTopAligned
								 ? floatingmenu.marginTop
								 : 0 );
		}

		floatingmenu.floatTo( editablePos );
	}