function(postOrGet) {
			var type = postOrGet.toUpperCase() || 'POST';
			var url = $(this).attr('action');
			var data = $(this).serialize();
			var form = this;
			var success = function(data) {
				$('body').removeClass('loading');
				$(form).trigger('result', [data]);
			};
			var errorHandler = function(jqXHR, message, exception) {
				$('body').removeClass('loading');
				$(form).trigger('error', [jqXHR, message, exception]);
			};
			var dataType = 'html';
			if ($(form).attr('data-format') == 'json') {
				dataType = 'json';
			}
			$('body').addClass('loading');
			$(form).trigger('before');
			$.ajax({
				type: type,
				url: url,
				data: data,
				success: success,
				dataType: dataType
			}).error(errorHandler);
			return false;	
		}