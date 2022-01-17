function update_inis(page) {
	var url = "update_inis?page=" + page;
	$.ajax({ 
        	url: url,
        	type: "POST",
		data: { page: page },
        	dataType: "text",
        	success: function(data) {
  			$("#initable").remove();
			$("#inipages").remove();
            		$("#inicontent").append(data);
        	}
    	});	
	return false;
}