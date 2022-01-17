function(doc, cdt, cdn) {
	var d = locals[cdt][cdn];
	var cond = (doc.order_type == 'Maintenance')? " and tabItem.is_service_item = 'Yes'" : " and tabItem.is_sales_item = 'Yes'"
	if(doc.customer)
		return repl("SELECT i.name,i.item_code,concat('Last quoted at - ',cast(quote_rate as char)) as quote_rate,concat('Last sold at - ',cast(sales_rate as char)) as sales_rate, i.item_name, i.description FROM\
		(\
			select item_code,name, item_name, description from tabItem where tabItem.%(key)s like '%s' %(cond)s\
		)i\
		left join\
		(\
			select q.item_code,q.quote_rate from\
			(\
				select q.transaction_date,qd.item_code,qd.basic_rate as quote_rate from `tabQuotation Item` qd, `tabQuotation` q where q.name=qd.parent and q.docstatus=1 and customer='%(cust)s'\
			)q,\
			(\
				select qd.item_code,max(q.transaction_date) as transaction_date from `tabQuotation Item` qd, `tabQuotation` q where q.name=qd.parent and q.docstatus=1 and customer='%(cust)s' group by qd.item_code\
			)m where q.item_code=m.item_code and q.transaction_date=m.transaction_date\
		)q on i.item_code=q.item_code\
		left join\
		(\
			select r.item_code,r.sales_rate from\
			(\
				select r.voucher_date,rd.item_code,rd.basic_rate as sales_rate from `tabSales Invoice Item` rd, `tabSales Invoice` r where r.name=rd.parent and r.docstatus=1 and r.customer='%(cust)s'\
			)r,\
			(\
				select rd.item_code,max(r.voucher_date) as voucher_date from `tabSales Invoice Item` rd, `tabSales Invoice` r where r.name=rd.parent and r.docstatus=1 and r.customer='%(cust)s' group by rd.item_code\
			)m where r.item_code=m.item_code and r.voucher_date=m.voucher_date\
		)s on i.item_code=s.item_code ORDER BY i.item_code LIMIT 50",{cust:doc.customer, cond:cond});
	else
		return repl("SELECT name, item_name, description FROM tabItem WHERE `tabItem`.%(key)s LIKE '%s' %(cond)s ORDER BY tabItem.item_code DESC LIMIT 50", {cond:cond});
}