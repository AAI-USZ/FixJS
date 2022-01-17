function initializeUI (dom, templates, ui, util) {
			/* Create the UI */

			this.defineTemplates(templates, ui, util);
			$('#sidebar').appendAll( util.assemble(templates.main) );

			/* Adjust the height of the image area based on the height of the preview area.  */
			util.adjustContainerHeights();

			/* Autoeditor check */
			var autoeditorList = JSON.parse(util.getLSValue('autoeditors', 1)),
				thisEditor = $('.account > a:first').text();
			if (-1 !== $.inArray(thisEditor, autoeditorList)) {
				/* The following non-typical bool test is required here!  localStorage.getItem actually returns a Storage
				   object, even though it *looks* like it is returning a string. */
				dom['Options‿input‿checkbox‿autoedit'][0].checked = (util.getLSValue('autoedit') === "true");
				$('.autoedit').show();
			}

			// Add a 'load info' button to each release row
			$( '#content' ).detach( function addImageRows () {
				$.single( this ).find( 'a' )
				                .filter( '[resource^="[mbz:release/"]' )
				                .each( ui.addImageRow );
			});

			/* This must be added after the fact, rather than at initial element creation.  Otherwise, an empty
			   box containing the title text will be displayed. */
			dom['Preview‿img‿preview_image'].prop('title', $.l('Click to edit this image'));
			
			// Initialize the settings color picker
			ui.createColorPicker('Options‿input‿color‿colors');
			this.initializeColorPicker(util, dom);

			// Create load all button
			$.make('input', { 'class': 'caaAll'
			                , noid    : true
			                , title: $.l('Load text all releases')
			                , type: 'button'
			                , value: $.l('Load CAA images for all')
			                })
			 .insertBefore('table.tbl');
		}