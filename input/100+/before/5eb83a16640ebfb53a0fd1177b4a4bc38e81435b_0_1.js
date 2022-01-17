function(){
   		var caret = '<span class="caret"></span>'
   		if(stringTrim(($(this).html())) == stringTrim($("#selected_sort").html().replace(caret, ''))){
   			$("#sortFilter").hide();
        	return false;
		}
		$('.sort_filter_label.active').removeClass('active');
		$(this).addClass('active');
        $("#selected_sort").html($(this).html() + caret);
        $("#sortFilter").hide();
        updateGallery(undefined, window.params.queryParamsMax, 0);
        return false;   
   }