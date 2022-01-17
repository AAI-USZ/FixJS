function(doc, dt, dn) {
	var allow_attach_list = ['Website Settings', 'Web Page', 'Timesheet', 'Ticket',
		'Support Ticket', 'Supplier', 'Style Settings', 'Stock Reconciliation',
		'Stock Entry', 'Serial No', 'Sales Order', 'Sales Invoice',
		'Quotation', 'Question', 'Purchase Receipt', 'Purchase Order',
		'Project', 'Profile', 'Production Order', 'Product', 'Print Format',
		'Price List', 'Purchase Invoice', 'Page', 'Module Def',
		'Maintenance Visit', 'Maintenance Schedule', 'Letter Head',
		'Leave Application', 'Lead', 'Journal Voucher', 'Item', 'Purchase Request',
		'Expense Claim', 'Opportunity', 'Employee', 'Delivery Note',
		'Customer Issue', 'Customer', 'Contact Us Settings', 'Company',
		'Bulk Rename Tool', 'Blog', 'BOM', 'About Us Settings'];
	
	if(inList(allow_attach_list, doc.doc_type)) {
		unhide_field('allow_attach');
	} else {
		hide_field('allow_attach');
	}
}