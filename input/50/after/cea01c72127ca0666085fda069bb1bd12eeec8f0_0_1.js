function(doc, cdt, cdn) {
	if(doc.serial_no) {
		return 'SELECT `tabSerial No`.item_code, `tabSerial No`.description \
			FROM `tabSerial No` \
			WHERE `tabSerial No`.docstatus != 2 AND `tabSerial No`.name = "' + doc.serial_no +
			'" AND `tabSerial No`.item_code LIKE "%s" ORDER BY `tabSerial No`.item_code ASC LIMIT 50';
	}
	else{
		return 'SELECT `tabItem`.name, `tabItem`.item_name, `tabItem`.description \
			FROM `tabItem` \
			WHERE `tabItem`.docstatus != 2 AND `tabItem`.%(key)s LIKE "%s" ORDER BY `tabItem`.name ASC LIMIT 50';
	}
}