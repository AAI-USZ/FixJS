function () {
		$.ajax({
			url: $('#editor_form').attr('action'),
			type: 'POST',
			data:  $('#editor_form').serialize(),
			success: function(data, textStatus, jqXHR){
				if(data.match('invalid_form')){
					$('#editor-dialog').html(data).modal('show');
					$('.field_error').effect("highlight", { times: 3 }, 1200);
				}
			},
		})
	}