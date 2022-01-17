function staticCallback(data) {
	var form = $('#smart-playlist-form');
	form.find('span[class="sp-errors"]').remove();
	form.find(' span[id="sp-errors"]').remove();
	var json = $.parseJSON(data);
	if (json.result == "1") {
	    $.each(json.errors, function(index, error){
            $.each(error.msg, function(index, message){
                $('#'+error.element).parent().append("<span class='sp-errors'>"+message+"</span><span id='sp-errors'><br /></span>");
            });
        });
    }
}