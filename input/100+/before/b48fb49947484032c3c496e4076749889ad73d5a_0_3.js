function dynamicCallback(json) {
	var json = $.parseJSON(data);
	if (json.result == "1") {
        $.each(json.errors, function(index, error){
            $.each(error.msg, function(index, message){
                $('#'+error.element).parent().append("<span class='errors'>"+message+"<br /></span>");
            });
        });
    }
}