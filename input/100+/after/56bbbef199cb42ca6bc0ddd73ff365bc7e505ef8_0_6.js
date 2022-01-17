function closeDialogImageEditor (e, util) {
			var dom = INNERCONTEXT.DOM;
			
			dom['ImageEditor‿div‿ie'].animate({ height  : 'toggle'
			                                   , opacity : 'toggle'
			                                   }, 'slow');
			dom['ImageEditor‿div‿CAAoverlay'].fadeOut('fast');
			[util || INNERCONTEXT.UTILITY].closeDialogGeneric(e);
		}