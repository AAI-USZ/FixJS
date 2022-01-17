function() {
		/**
		 * Invole me button click to open modal
		 */
		$('body').on('click', 'a[href="#involve-me"]', function(e) {
			e.preventDefault();
			$('#involveMeModal').modal('show');
		});

		/**
		 * Involve me form submit
		 */
		$('#getInvolvedModalForm').on('submit', function(e) {
			return;

			e.preventDefault();
			var $form = $(this),
				$modal = $('#involveMeModal'),
				$content = $modal.find('.modal-body'),
				$successModal = $('#involveMeSuccessModal');

			$content.find('.alert').slideUp('fast', function() {
				$(this).remove();
			});

			$.ajax({
				url: $form.attr('action'),
				type: 'post',
				data: $form.serialize(),
				success: function(response) {
					if (response.success) {
						$.formReset($form);
						$modal.modal('hide');
						$successModal.find('.modal-body h3').html(response.message);
						$successModal.modal('show').delay(3000, function(e) { });
					} else {
						Elm.error(response.message, $content, 'prepend');
					}
				},
				error: function() {
					Elm.error("Oops! We've encountered some troubles. Try again shortly!", $content, 'prepend');
				}
			});
			return false;
		});

		/**
		 * Contact button click to open modal
		 */
		$('body').on('click', '.contact-button', function(e) {
			e.preventDefault();
			$('#contactModal').modal('show');
			if ($(this).data('to')) {
				$('#contactModalForm').find('input[name="user_to_id"]').val($(this).data('to'));
			}
		});

		/**
		 * Involve me form submit
		 */
		$('#contactModalForm').on('submit', function(e) {
			e.preventDefault();
			var $form = $(this),
				$modal = $('#contactModal'),
				$content = $modal.find('.modal-body'),
				$successModal = $('#contactSuccessModal'),
				$loader = $('<span class="loader green">Loading...</span>');

			$content.find('.alert').slideUp('fast', function() {
				$(this).remove();
			});
			$content.find('button').attr('disable', 'disable').after($loader);

			$.ajax({
				url: $form.attr('action'),
				type: 'post',
				data: $form.serialize(),
				complete: function(response) {
					$loader.remove();
					$content.find('button').attr('disable', '');
				},
				success: function(response) {
					if (response.success) {
						$.formReset($form);
						$modal.modal('hide');
						$successModal.find('.modal-body h3').html(response.message);
						$successModal.modal('show').delay(3000, function(e) { });
					} else {
						Elm.error(response.message, $content, 'prepend');
					}
				},
				error: function() {
					Elm.error("Oops! We've encountered some troubles. Try again shortly!", $content, 'prepend');
				}
			});
			return false;
		});

		/**
		 * Simple toggle to show additional content
		 */
		$('body').on('click', 'a.action[href^="#"]', function(e) {
			e.preventDefault();
			$($(this).attr('href')).show();
		})

		/**
		 * Login form clicks/actions
		 */
		$('body').on('click', '[href*="profile/login/"]', function(e) {
			e.preventDefault();
			$('#headerLoginForm').stop(true).slideDown(function() {
				$(this).find('.cancel').on('click', function(e) {
					e.preventDefault();
					$('#headerLoginForm').stop(true).slideUp();
				})
			});
		});
	}