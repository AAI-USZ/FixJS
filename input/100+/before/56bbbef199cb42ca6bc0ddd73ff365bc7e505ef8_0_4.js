function initializeSubscribers (ui, util, dom, events) {
			var change  = 'change'
			  , click   = 'click'
			  ;

            // Toggle control for options menu
			dom['Main‿div‿options_control'].on( click, { element: 'Options‿fieldset‿main' }, events.slideToggle );

            // Toggle control for about menu
			dom['Main‿div‿about_control'].on( click, { element: 'About‿fieldset‿main' }, events.slideToggle );

			// Image size controls
			dom['Main‿div‿imageShrink'].on( click, { change: -1 }, util.changeImageSize );
			dom['Main‿div‿imageMagnify'].on( click, { change: 1 }, util.changeImageSize);

			// remember preference: parse webpages checkbox
			dom['Options‿input‿checkbox‿parse'].on( change, { key: 'parse', type: 'checkbox' }, util.setLSValue );

			// remember preference: autoedit checkbox
			dom['Options‿input‿checkbox‿autoedit'].on( change, { key: 'autoedit', type: 'checkbox' }, util.setLSValue );

			// remember preference: language selector
			dom['Options‿select‿language'].on( change, { key: 'language', type: 'select' }, util.setLSValue );

			// remember preference: image editor shadow level
			dom['Options‿input‿number‿shadow'].on( change, { key: 'editorShadow', type: 'text' }, util.setLSValue );

			// Clear image storage button
			dom['Options‿input‿button‿clear_storage'].on( click, util.clearImageStore );

			dom.body.on( click, '.closeButton', util.closeDialogGeneric ) // Add functionality to generic close buttons
			        .on( click, '#ImageEditor‿input‿button‿ieCancelBtn', { dom: dom }, util.closeDialogImageEditor ) // Add functionality to the image editor's cancel button
			        .on( click, '.caaAdd', ui.addNewImageDropBox) // Add new image dropboxes
			        .on( click, '.caaLoad', util.loadRowInfo) // Load release info
			        .on( click, '.previewable:not(.newCAAimage)', { dom: dom, ui: ui }, util.previewImage ) // Image preview functionality
			        .on( click, '.caaAll', events.caaAllBtn.click ) // Load all button functionality
			        // Add functionality to allow dragging from the images box to a specific CAA image box.
			        .on( 'dragstart', '.localImage', events.handleDrag.dragstart )
			        .on( 'dragend', '.localImage', events.handleDrag.check )
			        .on( 'dragover dragenter dragleave drop', '.newCAAimage', events.handleDrag.check )
					.on('click', '#Preview‿img‿preview_image', function (e) { $('.ie').show(); });

			dom['Main‿div‿imageContainer'].on( click, '.tintImage', util.removeWrappedElement )	// Remove images (in remove image mode)
			                              .on( 'mouseenter mouseleave', '.localImage', util.toggleRedTint )	// Tint images (in remove image mode)
			                              .on({ dragenter : util.addClass // Highlight field
			                                  , dragleave : util.removeClass // Unhighlight field
			                                  }, { 'class': 'over' })
			                              .on({  dragover    : util.preventDefault // Required for drag events to work
			                                  ,  drop        : util.handleDroppedResources // Handle drops into the drop area
			                                  , 'haveRemote' : // Handle remote non-image resources to be loaded
			                                      function ( e, type ) {
			                                          type ? util.getRemoteFile( e.data.uri, type ) : util.getRemotePage( e.data.uri );
			                                      }
			                                  , 'haveLocalFileList' : util.loadLocalFile // Handle local images to be loaded
			                                      
			                                  });

			// Handle a signal that a new remote image has been retreived and is ready to use
			dom.xhrComlink.on( 'dblclick', '.image', util.addRemoteImage );

			// Add functionality to the options color picker select.
			dom['Options‿select‿colors'].on(change, { util: util, picker: dom['Options‿input‿color‿colors'] }, ui.changeSelectedColorOption);

			// Store new options color value in localStorage.
			dom['Options‿input‿color‿colors'].on(change, { util: util, color: dom['Options‿select‿colors'].find(':selected').val() }, util.storeColor);

			// Add functionality to the options color default button.
			dom['Options‿input‿button‿default'].on('click', { dom: dom, util: util, picker: dom['Options‿input‿color‿colors'] }, util.resetColorToDefault);
						
			// Data loading transition handlers for image rows
			$('form[action*="merge_queue"]').on( 'loading', '.imageRow', ui.showLoading)
			                                .on( 'loaded', '.imageRow', ui.showImageRow);
		}