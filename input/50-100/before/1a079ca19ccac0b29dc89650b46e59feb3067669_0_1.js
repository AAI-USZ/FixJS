function() {
		// first 
		var order_by = this.get_full_column_name([this.sort_by_select.val()]) 
			+ ' ' + this.sort_order_select.val()
		
		// second
		if(this.sort_by_next_select.val()) {
			order_by += ', ' + this.get_full_column_name([this.sort_by_next_select.val()]) 
				+ ' ' + this.sort_order_next_select.val()
		}
		
		return order_by;
	}