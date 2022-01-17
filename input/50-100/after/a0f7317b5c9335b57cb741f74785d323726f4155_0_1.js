function() {
		return {
			doctype: this.doctype,
			fields: this.get_query_fields(),
			filters: this.filter_list.get_filters(),
			docstatus: this.can_submit ? $.map(this.$page.find('.show-docstatus :checked'), 
				function(inp) { return $(inp).attr('data-docstatus') }) : [],
			order_by: this.listview.order_by || undefined,
			group_by: this.listview.group_by || undefined,
		}
	}