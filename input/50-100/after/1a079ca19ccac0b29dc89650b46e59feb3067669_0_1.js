function() {
		// first 
		var order_by = this.get_selected_table_and_column(this.sort_by_select) 
			+ ' ' + this.sort_order_select.val()
			
		// second
		if(this.sort_by_next_select.val()) {
			order_by += ', ' + this.get_selected_table_and_column(this.sort_by_next_select) 
				+ ' ' + this.sort_order_next_select.val()
		}
		
		return order_by;
	}