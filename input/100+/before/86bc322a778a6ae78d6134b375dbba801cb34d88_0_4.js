function initializeSubscribers () {
			var $dom    = INNERCONTEXT.DOM
			  , $util   = INNERCONTEXT.UTILITY
			  , change  = 'change'
			  , click   = 'click'
			  ;

			var slideToggle = function (e) {
				$dom[e.data.element].slideToggle();
			};

            // Toggle control for options menu
			$dom['Main‿div‿options_control'].on( click, { element: 'Options‿fieldset‿main' }, slideToggle );

            // Toggle control for about menu
			$dom['Main‿div‿about_control'].on( click, { element: 'About‿fieldset‿main' }, slideToggle );

			// Image size controls
			$dom['Main‿div‿imageShrink'].on( click, { change: -1 }, $util.changeImageSize );
			$dom['Main‿div‿imageMagnify'].on( click, { change: 1 }, $util.changeImageSize);

			// remember preference: parse webpages checkbox
			$dom['Options‿input‿checkbox‿parse'].on( change, { key: 'parse', type: 'checkbox' }, $util.setLSValue );

			// remember preference: autoedit checkbox
			$dom['Options‿input‿checkbox‿autoedit'].on( change, { key: 'autoedit', type: 'checkbox' }, $util.setLSValue );

			// remember preference: language selector
			$dom['Options‿select‿language'].on( change, { key: 'language', type: 'select' }, $util.setLSValue );

			// remember preference: image editor shadow level
			$dom['Options‿input‿number‿shadow'].on( change, { key: 'editorShadow', type: 'text' }, $util.setLSValue );

			// Clear image storage button
			$dom['Options‿input‿button‿clear_storage'].on( click, $util.clearImageStore );

			// Add functionality to close buttons
			$dom.body.on( click, '.closeButton', $util.closeDialogGeneric)
			         .on( click, '#CAAeditiorCancelBtn', $util.closeDialogImageEditor);

			var dropHandler = function dropHandler (e) {
				var $util        = INNERCONTEXT.UTILITY
				  , dataTransfer = e.dataTransfer
				  , getData      = dataTransfer.getData
				  , getText      = getData('Text')
				  ;

				$util.removeClass(e, 'over');
				$util.preventDefault(e);
				e = e.originalEvent || e;

				var dropped = { file_list : dataTransfer.files
				              , base      : $(getText).find('base').attr('href') || ''
				              , text      : getText.match(INNERCONTEXT.CONSTANTS.REGEXP.uri) || ''
				              , uri       : getData('text/uri-list')
				              , e         : e
				              };
				$.log(dropped);
				handleURIs(dropped);  // TODO: Not yet migrated!
			};

			$dom['#Main‿div‿imageContainer'].on( click, '.tintImage', $util.removeWrappedElement )	// Remove images (in remove image mode)
			                                 .on( 'mouseenter mouseleave', '.localImage', $util.toggleRedTint )	// Tint images (in remove image mode)
			                                 .on({ dragenter : $util.addClass // Highlight field
			                                     , dragleave : $util.removeClass // Unhighlight field
			                                     }, { 'class': 'over' })
			                                 .on({ dragover : $util.preventDefault // Required for drag events to work
			                                     , drop     : dropHandler // Handle drops into the drop area
			                                     });
		}