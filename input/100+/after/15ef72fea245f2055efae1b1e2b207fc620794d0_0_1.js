function() {
		var prefix = '#add-item-'; // Just so if we change prefix it'll be easy to just change it here
		
		item = $(prefix+'item').val();
		priority = $(prefix+'priority').val();
		price = $(prefix+'price').val();
		qty = $(prefix+'qty').val();
		units = $(prefix+'units').val();
		tags = $(prefix+'tags').val();
		
		if(item == "") {
			notify('Item name cannot be empty!', 'alert-error', true, '#modal-add-item .modal-body');
			return;
		}
		
		add = {id:100,item:item,priority:priority,price:price,qty:qty,units:units,tags:tags};
		insertItem(add);
		$('#modal-add-item').modal('hide');
	}