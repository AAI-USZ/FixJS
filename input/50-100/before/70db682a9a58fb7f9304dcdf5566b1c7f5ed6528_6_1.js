function(wrapper){
	// set route
	var ctype = wn.get_route()[1] || 'Territory';
	wrapper.appframe.title(ctype + ' Tree');  

	if(erpnext.sales_chart && erpnext.sales_chart.ctype != ctype) {
		wrapper.make_tree();
	}
}