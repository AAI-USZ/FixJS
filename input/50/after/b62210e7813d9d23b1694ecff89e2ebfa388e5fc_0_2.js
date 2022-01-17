function() {
		if(screen.width >= 979) { // Desktop
			$('#add-note-modal').addClass('modal');
			$('#add-note-modal').modal();
		}
		else { // Mobile
			$('#modal-note-phone').show();
		}
	}