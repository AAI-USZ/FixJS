function handleDrag_dragenter (e, handleDrag) {
		this.inChild = !$(e.target).hasClass('newCAAimage');
		$('figure').removeClass('over');
		$.single(this).addClass('over');
	}