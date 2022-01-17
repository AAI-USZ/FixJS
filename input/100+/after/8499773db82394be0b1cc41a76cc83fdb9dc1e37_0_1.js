function(doc, cdt, cdn) {
	var d = locals[cdt][cdn];
	var cond = (doc.order_type == 'Maintenance') ? " and item.is_service_item = 'Yes'" : " and item.is_sales_item = 'Yes'";
	if(doc.customer) {
		var export_rate_field = wn.meta.get_docfield(cdt, 'export_rate', cdn);
		var precision = (export_rate_field && export_rate_field.fieldtype) === 'Float' ? 6 : 2;
		return repl("\
			select \
				item.name, \
				( \
					select concat('Last Quote @ ', q.currency, ' ', \
						format(q_item.export_rate, %(precision)s)) \
					from `tabQuotation` q, `tabQuotation Item` q_item \
					where \
						q.name = q_item.parent \
						and q_item.item_code = item.name \
						and q.docstatus = 1 \
						and q.customer = \"%(cust)s\" \
					order by q.transaction_date desc \
					limit 1 \
				) as quote_rate, \
				( \
					select concat('Last Sale @ ', si.currency, ' ', \
						format(si_item.basic_rate, %(precision)s)) \
					from `tabSales Invoice` si, `tabSales Invoice Item` si_item \
					where \
						si.name = si_item.parent \
						and si_item.item_code = item.name \
						and si.docstatus = 1 \
						and si.customer = \"%(cust)s\" \
					order by si.voucher_date desc \
					limit 1 \
				) as sales_rate, \
				item.item_name, item.description \
			from `tabItem` item \
			where \
				item.%(key)s like \"%s\" \
				%(cond)s \
				limit 25", {
					cust: doc.customer,
					cond: cond,
					precision: precision
				});
	} else {
		return repl("SELECT name, item_name, description FROM tabItem WHERE `tabItem`.%(key)s LIKE '%s' %(cond)s ORDER BY tabItem.item_code DESC LIMIT 50", {cond:cond});
	}
}