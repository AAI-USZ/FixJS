function(table, row) {	
			var form = $(table).parents('form');
			
			form.find('input.operation').val('sort');
			
			var options = {
				operation	: 'sort',
				crudId		: form.attr('id')
			};
			var url = form.attr('action') + "?" + $.param(options);
			var data = $(table).tableDnDSerialize();
						
			// Add CSRF token
			data = data + '&_token=' + form.find('input[name=\'_token\']').val();
			
			// Add sort fieldname
			data = data + '&field=' + form.find('td.sort:eq(0)').attr('data-field');
			
			$.post(url, data, function(response) {
				if (response.operation === 'sort' && response.success === true) {					
					AC.Core.Alert.flash(response.message);
				}
			}, 'json').error(function(jqXHR, message, exception) {
				$('body').removeClass('loading');
				errorHandler(i18n.requestError + ' (' + exception + ')');
			});
		}