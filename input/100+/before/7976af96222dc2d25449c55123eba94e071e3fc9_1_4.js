function( editor )
		{
			// Register commands.
			var definitionListCommand = new defListCommand( 'definitionlist', 'dl' ),
				definitionTermCommand = new defListCommand( 'definitionterm', 'dt' ),
				definitionDescCommand = new defListCommand( 'definitiondesc', 'dd' );

			editor.addCommand( 'definitionlist', definitionListCommand );
			editor.addCommand( 'definitionterm', definitionTermCommand );
			editor.addCommand( 'definitiondesc', definitionDescCommand );

			// Register the toolbar button.
			editor.ui.addButton( 'DefinitionList',
				{
					label : editor.lang.definitionList,
					command : 'definitionlist',
					icon : this.path + 'images/dl.gif'
				} );
			editor.ui.addButton( 'DefinitionTerm',
				{
					label : editor.lang.definitionTerm,
					command : 'definitionterm',
					icon : this.path + 'images/dt.gif'
				} );
			editor.ui.addButton( 'DefinitionDescription',
				{
					label : editor.lang.definitionDesc,
					command : 'definitiondesc',
					icon : this.path + 'images/dd.gif'
				} );

			// Register the state changing handlers.
			editor.on( 'selectionChange', CKEDITOR.tools.bind( onSelectionChange, definitionListCommand ) );
			editor.on( 'selectionChange', CKEDITOR.tools.bind( onSelectionChange, definitionTermCommand ) );
			editor.on( 'selectionChange', CKEDITOR.tools.bind( onSelectionChange, definitionDescCommand ) );
		}