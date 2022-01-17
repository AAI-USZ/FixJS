function() {
				var multiOptions = $this.find('.multi-option:not(.multi-step)');

				form.editMethod.find('option[value!=""]').each(function() {
					var value = $(this).val();

					var option = multiOptions.filter(function() {
						return $(this).hasClass('multi-option-'+value);
					});

					if (option.length > 0)
					{
						public.addOption({
							'label' : null,
							'html' : option.eq(0).contents(),
							'value' : $(this).val()
						});
					}
				});

				multiOptions.remove();
			}