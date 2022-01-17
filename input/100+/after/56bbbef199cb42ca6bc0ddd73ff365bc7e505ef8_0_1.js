function handleDrag_drop (e, handleDrag, self) {
		if (!$.single(e.target).hasClass('newCAAimage')) {
			return;
		}	
		self.parentNode.replaceChild(this.$draggedImage[0], self);
		this.$draggedImage.toggleClass('beingDragged dropBoxImage localImage')
		                  .parents('figure:first').toggleClass('newCAAimage workingCAAimage over')
		                                          .css('background-color', INNERCONTEXT.UTILITY.getEditColor($.single(self)));
		$('figure').removeClass('over');
		this.$draggedImage = null;
	}