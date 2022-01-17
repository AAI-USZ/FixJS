function updateOptions(el, options){
    var val = $(el).val();
    val = val.replace('.',  '_');
    var uniqueid = $(el).parent(".filterline").find(".uniquefilterid").val();
    $(el).parent(".filterline").find(".filteroptions").html($('#filterdummyoptions_'+ val).html());
    $(el).parent(".filterline").find("input, select").each(function(){
    	var fieldName = $(this).attr("name");
    	if (fieldName.substr(0, 7) != "filter_") {
    		$(this).attr("name", "filter_" + $(this).attr("name"));
    	}
    });    
    $(el).parent(".filterline").find(".filteroptions").find("input:not(.uniquefilterid), select").each(function(){
        $(this).attr("name", $(this).attr("name") + "_" + uniqueid);
		if($(this).hasClass("datepick")){
			$(this).datePicker(options);				
		}
    });
}