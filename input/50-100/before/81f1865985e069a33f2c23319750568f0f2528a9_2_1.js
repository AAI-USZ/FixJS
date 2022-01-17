function(){
				modal.appendTo(that);
				$('form', $(this)).on('submit', updateSettings);
				$('#settings-finished', $(this)).on('click', function(){
					modal.toggleClass('hide');
				});
			}