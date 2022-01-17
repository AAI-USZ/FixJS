function() {
			deleteNote(id, true, true);
			$('#delete-confirm-modal-'+id).modal('hide');
			$('#delete-confirm-modal-'+id).remove();
		}