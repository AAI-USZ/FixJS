function(doc) {
	if (doc.convert_into_recurring_invoice) {
		doc.repeat_on_day_of_month = doc.posting_date.split('-')[2];
		doc.notification_email_address = [doc.owner, doc.contact_email].join(', ');
		refresh_field(['repeat_on_day_of_month', 'notification_email_address']);
	}		
}