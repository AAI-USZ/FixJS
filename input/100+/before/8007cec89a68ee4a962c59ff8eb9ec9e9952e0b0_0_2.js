function updateOptions(el){
    var val = $(el).val();
    val = val.replace('.',  '_');
    $(el).parent(".filterline").find(".filteroptions").html($('#filterdummyoptions_'+ val).html());
   	$(el).parent(".filterline").find(".datepick").datePicker();
}