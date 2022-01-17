function()
		{
			$('.modal-inventory label').each(function(i, o){
				var n = $(o).text();
				var v = $(o).find('input').val();
				var f = getOrgFieldData(n);
				if (f){
					if (v != 0){
						f.total = v
					}	else{
						// splice field from category //
						for (var i = category.fields.length - 1; i >= 0; i--) {
							if (category.fields[i].name == n) category.fields.splice(i, 1);
						};
					}
				}	else {
					if (v != 0){
					// field did not previously exist //
						category.fields.push({ name : n, avail : 0, total : v });
					}
				}
			});	
			category.total = 0;
			for (var i = category.fields.length - 1; i >= 0; i--) category.total += parseInt(category.fields[i].total);
			if (category.total == 0){
			//	remove category from org's inventory //
				removeItemFromView(category.name);
				for (var i = OUR_SERVICES.length - 1; i >= 0; i--) if (OUR_SERVICES[i].name == category.name) OUR_SERVICES.splice(i, 1);
			}
		// update the outside world //
			postToSockets()
			postToDatabase();
		}