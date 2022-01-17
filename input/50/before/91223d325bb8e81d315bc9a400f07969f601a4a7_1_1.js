function(doc) {
   //var d = locals[this.doctype][this.docname];
   return 'SELECT DISTINCT `tabBOM`.`name` FROM `tabBOM` WHERE `tabBOM`.`item` = "' + doc.item_code + '"  AND `tabBOM`.`is_active` = "No" and `tabBOM`.docstatus != 2 AND `tabBOM`.%(key)s LIKE "%s" ORDER BY `tabBOM`.`name` LIMIT 50'
}