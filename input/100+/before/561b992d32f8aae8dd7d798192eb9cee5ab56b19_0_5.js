function() {
				public.addOption({
					'label' : null,
					'html' : $(this).contents(),
					'value' : $(this).attr('id').substring(13)
				});
			}