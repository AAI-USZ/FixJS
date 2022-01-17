function () {
		if ( this.isActive ) {
			return;
		}

		var that = this,
		    htmlTableWrapper,
		    tableWrapper;
		
		// alter the table attributes
		this.obj.addClass( this.get( 'className' ) );
		this.obj.contentEditable( false );
		
		// set an id to the table if not already set
		if ( this.obj.attr( 'id' ) == '' ) {
			this.obj.attr( 'id', GENTICS.Utils.guid() );
		}
		
		// unset the selection type
		this.selection.selectionType = undefined;
		
		this.obj.bind( 'keydown', function ( jqEvent ) {
			if ( !jqEvent.ctrlKey && !jqEvent.shiftKey ) {
				if ( that.selection.selectedCells.length > 0 &&
						that.selection.selectedCells[ 0 ].length > 0 ) {
					that.selection.selectedCells[ 0 ][ 0 ].firstChild.focus();
				}
			}
		} );
		
		/*
		We need to make sure that when the user has selected text inside a
		table cell we do not delete the entire row, before we activate this
		
		this.obj.bind( 'keyup', function ( $event ) {
			if ( $event.keyCode == 46 ) {
				if ( that.selection.selectedColumnIdxs.length ) {
					that.deleteColumns();
					$event.stopPropagation();
				} else if ( that.selection.selectedRowIdxs.length ) {
					that.deleteRows();
					$event.stopPropagation();
				} else {
					// Nothing to delete
				}
			}
		} );
		*/
		
		// handle click event of the table
	//	this.obj.bind('click', function(e){
	//		// stop bubbling the event to the outer divs, a click in the table
	//		// should only be handled in the table
	//		e.stopPropagation();
	//		return false;
	//	});

		this.obj.bind( 'mousedown', function ( jqEvent ) {
			// focus the table if not already done
			if ( !that.hasFocus ) {
				that.focus();
			}

	// DEACTIVATED by Haymo prevents selecting rows
	//		// if a mousedown is done on the table, just focus the first cell of the table
	//		setTimeout(function() {
	//			var firstCell = that.obj.find('tr:nth-child(2) td:nth-child(2)').children('div[contenteditable=true]').get(0);
	//			TableSelection.unselectCells();
	//			jQuery(firstCell).get(0).focus();
	//			// move focus in first cell
	//			that.obj.cells[0].wrapper.get(0).focus();
	//		}, 0);

			// stop bubbling and default-behaviour
			jqEvent.stopPropagation();
			jqEvent.preventDefault();
			return false;
		} );

		// ### create a wrapper for the table (@see HINT below)
		// wrapping div for the table to suppress the display of the resize-controls of
		// the editable divs within the cells
		tableWrapper = jQuery(
			'<div class="' + this.get( 'classTableWrapper' ) + '"></div>'
		);
		tableWrapper.contentEditable( false );

		// wrap the tableWrapper around the table
		this.obj.wrap( tableWrapper );

		// :HINT The outest div (Editable) of the table is still in an editable
		// div. So IE will surround the the wrapper div with a resize-border
		// Workaround => just disable the handles so hopefully won't happen any ugly stuff.
		// Disable resize and selection of the controls (only IE)
		// Events only can be set to elements which are loaded from the DOM (if they
		// were created dynamically before) ;)
		 
		htmlTableWrapper = this.obj.parents( '.' + this.get( 'classTableWrapper' ) );
		htmlTableWrapper.get( 0 ).onresizestart = function ( e ) { return false; };
		htmlTableWrapper.get( 0 ).oncontrolselect = function ( e ) { return false; };
		htmlTableWrapper.get( 0 ).ondragstart = function ( e ) { return false; };
		htmlTableWrapper.get( 0 ).onmovestart = function ( e ) { return false; };
		htmlTableWrapper.get( 0 ).onselectstart = function ( e ) { return false; };

		this.tableWrapper = this.obj.parents( '.' + this.get( 'classTableWrapper' ) ).get( 0 );

		jQuery( this.cells ).each( function () {
			this.activate();
		} );

		// after the cells where replaced with contentEditables ... add selection cells
		// first add the additional columns on the left side
		this.attachSelectionColumn();
		// then add the additional row at the top
		this.attachSelectionRow();
		this.makeCaptionEditable();
		this.checkWai();
		this.isActive = true;

		Aloha.trigger( 'aloha-table-activated' );
	}