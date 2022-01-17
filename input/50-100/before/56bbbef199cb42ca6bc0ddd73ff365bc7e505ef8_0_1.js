function closeDialogGeneric (e) {
			$.single( this ).parent()
			              .find('.dropBoxImage') // Any image in the drop box
			              .appendTo($('#Main‿div‿imageContainer'))
			              .addClass('localImage')
			              .removeClass('dropBoxImage');
			INNERCONTEXT.UTILITY.removeWrappedElement(e);
		}