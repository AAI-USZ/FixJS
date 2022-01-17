function() {
	
		
	// $.fn.initPremium = function () {
	// 	current_node = this;
	// 
	// 	p = $(current_node).children().filter(":selected").val();
	// 	n = $.post("/getpayouts");
	// 
	// 	d = {"premium":p}
	// 	$.getJSON('/getpayouts.json', d, function(data) {
	// 	  var items = [];
	// 
	// 	  $.each(data, function(key, val) {
	// 		trnode = current_node.parentNode.parentNode;
	// 		$(trnode).children().find("#"+key).html(val)
	// 
	// 	  });
	// 
	// 	});
	//     
	// };
	// 
	// $('.premium').each($.initPremium);
	

  $('.premium').on('change', function(event) {
    //alert($(this).text());
    //alert($(this).closest('td').next().children().attr('id'));
	current_node = this;
	
	p = $(current_node).children().filter(":selected").val();
	n = $.post("/getpayouts");
	
	d = {"premium":p}
	$.getJSON('/getpayouts.json', d, function(data) {
	  var items = [];

	  $.each(data, function(key, val) {
		trnode = current_node.parentNode.parentNode;
		$(trnode).children().find("#"+key).html(val)

	  });

	});
	//alert()
    return event.preventDefault();
  });
	
}