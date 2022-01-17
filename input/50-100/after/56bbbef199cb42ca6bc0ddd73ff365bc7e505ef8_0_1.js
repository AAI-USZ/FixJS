function closeDialogGeneric (e) {
			var $self = $.single( this )
			  , util  = INNERCONTEXT.UTILITY
			  ;
			  
			if ($self.hasClass('CaabieImageEditor')) {
				$self.removeClass('CaabieImageEditor');
				util.closeDialogImageEditor(e, util);
			}
			$self.parent()
			     .find('.dropBoxImage') // Any image in the drop box
			     .appendTo($('#Main‿div‿imageHolder'))
			     .addClass('localImage')
			     .removeClass('dropBoxImage');
			util.removeWrappedElement(e);
		}