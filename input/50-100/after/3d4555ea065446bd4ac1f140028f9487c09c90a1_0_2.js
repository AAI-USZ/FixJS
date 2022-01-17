function(response) {
					if (response.success) {
						$.formReset($form);
						$modal.modal('hide');
						$successModal.find('.modal-body h3').html(response.message);
						$successModal.modal('show').delay(3000, function(e) { });
					} else {
						Elm.error(response.message, $content, 'prepend');
					}
				}