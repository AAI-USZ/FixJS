function initializeSubscribers (ui, util, dom) {
			var change  = 'change'
			  , click   = 'click'
			  ;

			var slideToggle = function (e) {
				dom[e.data.element].slideToggle();
			};

            // Toggle control for options menu
			dom['Main‿div‿options_control'].on( click, { element: 'Options‿fieldset‿main' }, slideToggle );

            // Toggle control for about menu
			dom['Main‿div‿about_control'].on( click, { element: 'About‿fieldset‿main' }, slideToggle );

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

			// Add functionality to close buttons
			dom.body.on( click, '.closeButton', util.closeDialogGeneric ) // Generic close buttons
			        .on( click, '#ieCancelBtn', util.closeDialogImageEditor ) // Image editor's cancel button
			        .on( click, '.caaAdd', ui.addNewImageDropBox) // Add new image dropboxes
			        .on( click, '.caaLoad', util.loadRowInfo); // Load release info

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
			                                  , 'haveLocalFileList' : // Handle local images to be loaded
			                                      function (e) {
			                                          util.loadLocalFile(e.list);
			                                      }
			                                  });

			// Handle a signal that a new remote image has been retreived and is ready to use
			dom.xhrComlink.on( 'dblclick', '.image', util.addRemoteImage );

			$('form[action*="merge_queue"]').on( 'loading', '.imageRow', ui.showLoading)
			                                .on( 'loaded', '.imageRow', ui.showImageRow);
		}