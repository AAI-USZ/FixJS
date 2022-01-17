function() {
		this.originalTitle = this.element.attr( "title" );
		// #5742 - .attr() might return a DOMElement
		if ( typeof this.originalTitle !== "string" ) {
			this.originalTitle = "";
		}
		this.oldPosition = {
			parent: this.element.parent(),
			index: this.element.parent().children().index( this.element )
		};
		this.options.title = this.options.title || this.originalTitle;
		var that = this,
			options = this.options,

			title = options.title || "&#160;",

			uiDialog = ( this.uiDialog = $( "<div>" ) )
				.addClass( uiDialogClasses + options.dialogClass )
				.css({
					display: "none",
					outline: 0, // TODO: move to stylesheet
					zIndex: options.zIndex
				})
				// setting tabIndex makes the div focusable
				.attr( "tabIndex", -1)
				.keydown(function( event ) {
					if ( options.closeOnEscape && !event.isDefaultPrevented() && event.keyCode &&
							event.keyCode === $.ui.keyCode.ESCAPE ) {
						that.close( event );
						event.preventDefault();
					}
				})
				.mousedown(function( event ) {
					that.moveToTop( false, event );
				})
				.appendTo( "body" ),

			uiDialogContent = this.element
				.show()
				.removeAttr( "title" )
				.addClass( "ui-dialog-content ui-widget-content" )
				.appendTo( uiDialog ),

			uiDialogTitlebar = ( this.uiDialogTitlebar = $( "<div>" ) )
				.addClass( "ui-dialog-titlebar  ui-widget-header  " +
					"ui-corner-all  ui-helper-clearfix" )
				.prependTo( uiDialog ),

			uiDialogTitlebarClose = $( "<a href='#'></a>" )
				.addClass( "ui-dialog-titlebar-close  ui-corner-all" )
				.attr( "role", "button" )
				.click(function( event ) {
					event.preventDefault();
					that.close( event );
				})
				.appendTo( uiDialogTitlebar ),

			uiDialogTitlebarCloseText = ( this.uiDialogTitlebarCloseText = $( "<span>" ) )
				.addClass( "ui-icon ui-icon-closethick" )
				.text( options.closeText )
				.appendTo( uiDialogTitlebarClose ),

			uiDialogTitle = $( "<span>" )
				.uniqueId()
				.addClass( "ui-dialog-title" )
				.html( title )
				.prependTo( uiDialogTitlebar ),

			uiDialogButtonPane = ( this.uiDialogButtonPane = $( "<div>" ) )
				.addClass( "ui-dialog-buttonpane ui-widget-content ui-helper-clearfix" ),

			uiButtonSet = ( this.uiButtonSet = $( "<div>" ) )
				.addClass( "ui-dialog-buttonset" )
				.appendTo( uiDialogButtonPane );

		uiDialog.attr({
			role: "dialog",
			"aria-labelledby": uiDialogTitle.attr( "id" )
		});

		uiDialogTitlebar.find( "*" ).add( uiDialogTitlebar ).disableSelection();
		this._hoverable( uiDialogTitlebarClose );
		this._focusable( uiDialogTitlebarClose );

		if ( options.draggable && $.fn.draggable ) {
			this._makeDraggable();
		}
		if ( options.resizable && $.fn.resizable ) {
			this._makeResizable();
		}

		this._createButtons( options.buttons );
		this._isOpen = false;

		if ( $.fn.bgiframe ) {
			uiDialog.bgiframe();
		}
	}