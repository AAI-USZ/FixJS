function(s) {
			var modal = $('#modal');
			if(!modal.length) modal = $('<div/>').attr('id', 'modal');
			else modal.toggleClass('hide');
			var that = this;
			modal.load('./layouts/settings.html', function(){
				modal.appendTo(that);
				$('form', $(this)).on('submit', updateSettings);
				$('#settings-finished', $(this)).on('click', function(){
					modal.toggleClass('hide');
				});
			});
		}