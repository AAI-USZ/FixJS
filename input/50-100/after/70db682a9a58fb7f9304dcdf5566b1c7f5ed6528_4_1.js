function(wrapper){
	// set route
	var ctype = wn.get_route()[1] || 'Account';

	wrapper.appframe.clear_breadcrumbs();
	wrapper.appframe.add_breadcrumb('Chart of '+ctype+'s');
	document.title = 'Chart of '+ctype+'s';
	wrapper.appframe.add_breadcrumb(' in <a href="#!accounts-home">Accounts</a>');

	if(erpnext.account_chart && erpnext.account_chart.ctype != ctype) {
		wrapper.$company_select.change();
	} 

}