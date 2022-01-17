function(wrapper){
	// set route
	var ctype = wn.get_route()[1] || 'Territory';

	wrapper.appframe.clear_breadcrumbs();
	wrapper.appframe.add_breadcrumb(ctype+' Tree')
	document.title = ctype+' Tree';
	
	wrapper.appframe.add_breadcrumb(' in <a href="#!selling-home">Selling</a>');

	if(erpnext.sales_chart && erpnext.sales_chart.ctype != ctype) {
		wrapper.make_tree();
	}
}