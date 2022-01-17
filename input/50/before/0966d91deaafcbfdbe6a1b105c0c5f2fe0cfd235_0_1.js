function() {
			deleteNote(id);
			$('#delete-confirm-modal-'+id).modal('hide');
			$('#delete-confirm-modal-'+id).remove();
		}