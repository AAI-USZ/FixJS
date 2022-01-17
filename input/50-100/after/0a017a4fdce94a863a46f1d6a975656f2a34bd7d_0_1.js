function add_fields(link, association, content) {
  var new_id = new Date().getTime();
  var regexp = new RegExp("new_" + association, "g")
  
  $(link).parent().before(content.replace(regexp, new_id));
  $( "#customer_orders_attributes_" + new_id + "_offering_name" ).autocomplete({
			source: $( "#customer_orders_attributes_0_offering_name" ).data('autocomplete-source')
	});
}