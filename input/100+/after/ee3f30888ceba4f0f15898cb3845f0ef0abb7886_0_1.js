function() {
			var self = this;
			$('form.ACCrudEdit a.cancel').click(AC.Crud.Edit.cancelHandler);
			$('form.ACCrudEdit button.save').click(AC.Crud.Edit.saveHandler);
			$('form.ACCrudEdit button.apply').click(function(e) {
				var self = this;
				AC.Crud.Edit.saveHandler.call(self, e, 'edit');
			});
			
			AC.Shortcut.add('Ctrl+S', AC.Crud.Edit.saveHandler);
			$(window).load(function() {
				self.equalizeForm();
			});
			
			var $window = $(window);
			var $crudEdit = $('dl.crudEdit:not(.block)');
			$(window).resize(function() {
				if ($crudEdit.width() < 942 && !$crudEdit.hasClass('small')) {
					$crudEdit.addClass('small');
				} else if ($crudEdit.width() > 941 && $crudEdit.hasClass('small')) {
					$crudEdit.removeClass('small');
				}
			}).resize();
		}