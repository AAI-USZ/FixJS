function dropHandler (e) {
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
				INNERCONTEXT.UTILITY.handleURIs(dropped);
			}