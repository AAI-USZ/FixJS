function()
		{
			category = { name : catSchema.name, avail : 0, total : 0, fields : [] };
			$('.modal-inventory label').each(function(i, o){
				var n = $(o).text();
				var v = $(o).find('input').val();
				if (v != 0) category.fields.push({ name : n, avail : 0, total : v });
			});
			category.total = 0;
			for (var i = category.fields.length - 1; i >= 0; i--) category.total += parseInt(category.fields[i].total);
			if (category.total == 0){
				editor.modal('hide');
				removeItemFromView(category.name);
			}	else{
			// update the outside world //
				OUR_SERVICES.push(category);
				postToSockets()
				postToDatabase();
				appendItemToView(category);
			}
		}