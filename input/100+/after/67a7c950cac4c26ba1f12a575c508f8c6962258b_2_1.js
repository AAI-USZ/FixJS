function( editor )

	{

		console.log('status ' + langChoice);

		// Define an editor command that inserts an abbreviation. 

		// http://docs.cksource.com/ckeditor_api/symbols/CKEDITOR.editor.html#addCommand

		editor.addCommand( 'statusDialog',new CKEDITOR.dialogCommand( 'statusDialog' ) );

		// Create a toolbar button that executes the plugin command. 

		// http://docs.cksource.com/ckeditor_api/symbols/CKEDITOR.ui.html#addButton

		editor.ui.addButton( 'Status',

		{

			// Toolbar button tooltip.

			label: 'Update Status',

			// Reference to the plugin command name.

			command: 'statusDialog',

			// Button's icon file path.

			icon: this.path + 'status.png'

		} );

		// Add a dialog window definition containing all UI elements and listeners.

		// http://docs.cksource.com/ckeditor_api/symbols/CKEDITOR.dialog.html#.add

		CKEDITOR.dialog.add( 'statusDialog', function ( editor )

		{

			return {

				// Basic properties of the dialog window: title, minimum size.

				// http://docs.cksource.com/ckeditor_api/symbols/CKEDITOR.dialog.dialogDefinition.html

				title : 'Change the Clip Status',

				minWidth : 400,

				minHeight : 200,

				// Dialog window contents.

				// http://docs.cksource.com/ckeditor_api/symbols/CKEDITOR.dialog.definition.content.html

				contents :

				[

				{

					id : 'selection',

					label : 'Change Status',

					elements :

					[

					{

										type: 'select',

										id : 'status',

										items : statusCodes[langChoice],

										// items : ['a', 'b'],

										'default' : 'EC',

										onChange : function (api) {

											// alert('Current value: ' + this.getValue() );

										}

					}

					]

				}

				],

				// This method is invoked once a user closes the dialog window, accepting the changes.

				// http://docs.cksource.com/ckeditor_api/symbols/CKEDITOR.dialog.dialogDefinition.html#onOk

				onOk : function()

				{

					var dialog = this;

					var value = dialog.getValueOf( 'selection', 'status' );

					clipid = edited.slice(1,-2);

					cat = $(jq(edited)).hasClass("orig") ? "orig" : "trans";

					

					var d = new XDate();

					d.toString("i");    

					

					var request = $.ajax({

							url: "../xq/updateStatus.xql",

							type: "GET",

							data: {

								"id": clipid,  

								"m": mmm,

								"ts": d.toString("i"),

								"au": author,

								"cat": cat,

								"val": value

							},

							async: false,

							contentType: "text/xml"

					});

					

					

					

					

					

					

					

					

				}

			};

		} );

	}