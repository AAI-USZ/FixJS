function(e) {			
			e.stopPropagation();
			e.preventDefault();
			var row = $(this).parents('tr');
			var id = row.find('input[type=checkbox]').attr('value');
			window.location.href = 'samples/view/' + id + '.html';
			return false;
		}