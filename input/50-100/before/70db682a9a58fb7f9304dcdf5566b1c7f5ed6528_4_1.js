function(wrapper){
	// set route
	var ctype = wn.get_route()[1] || 'Account';
	wrapper.appframe.title('Chart of '+ctype+'s');  

	if(erpnext.account_chart && erpnext.account_chart.ctype != ctype) {
		wrapper.$company_select.change();
	} 

}