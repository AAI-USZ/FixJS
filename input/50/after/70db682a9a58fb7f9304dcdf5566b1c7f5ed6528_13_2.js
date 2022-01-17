function() {
	return 'select name, description from tabItem where is_stock_item="No" and is_sales_item="Yes"\
		and name not in (select name from `tabSales BOM`)\
		and `%(key)s` like "%s"'
}