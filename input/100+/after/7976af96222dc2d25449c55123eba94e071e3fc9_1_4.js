function( editor )
		{
			// Register commands.
			var definitionListCommand = editor.addCommand( 'definitionlist', new defListCommand( 'definitionlist', 'dl' ) ),
				definitionTermCommand = editor.addCommand( 'definitionterm', new defListCommand( 'definitionterm', 'dt' ) ),
				definitionDescCommand = editor.addCommand( 'definitiondesc', new defListCommand( 'definitiondesc', 'dd' ) );

			var plugin = this;
			var getButton = function( command, label, image, offset )
			{
				var button =
					{
						icon : plugin.path + 'images/' + image, // @Packager.RemoveLine
						label : editor.lang[ label ],
						command : command
					};

				if ( !button.icon )
				{
					button.icon = editor.config.mindtouch.editorPath + '/images/icons.png';
					button.iconOffset = offset;
				}

				return button;
			};

			editor.ui.addButton( 'DefinitionList', getButton( 'definitionlist', 'definitionList', 'dl.gif', 7 ) );
			editor.ui.addButton( 'DefinitionTerm', getButton( 'definitionterm', 'definitionTerm', 'dt.gif', 8 ) );
			editor.ui.addButton( 'DefinitionDescription', getButton( 'definitiondesc', 'definitionDesc', 'dd.gif', 6 ) );

			// Register the state changing handlers.
			editor.on( 'selectionChange', CKEDITOR.tools.bind( onSelectionChange, definitionListCommand ) );
			editor.on( 'selectionChange', CKEDITOR.tools.bind( onSelectionChange, definitionTermCommand ) );
			editor.on( 'selectionChange', CKEDITOR.tools.bind( onSelectionChange, definitionDescCommand ) );
		}