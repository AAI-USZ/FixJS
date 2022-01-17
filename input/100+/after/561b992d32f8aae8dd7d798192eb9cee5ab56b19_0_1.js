function(options)
		{
			var settings = $.extend({
				'label' : null,
				'value' : null,
				'html' : null
			}, options);
			
			if (!settings.value)
			{
				return public;
			}

			var option = form.editMethod.find('option').filter(function() {
				return $(this).attr('value') === settings.value;
			});
			
			var exists = (option.length > 0);
			form.editMethod.val('');
			
			if (!exists)
			{
				option = $('<option />');
			}
			
			if (!option.data('method'))
			{
				if (!option.attr('value'))
				{
					option.attr('value', settings.value);
				}
				
				if (!option.text() && settings.label)
				{
					option.text(settings.label);
				}
				
				option.data('method', settings.html);
			}
			
			if (!exists)
			{
				form.editMethod.append(option);
			}
			
			return public;
		}