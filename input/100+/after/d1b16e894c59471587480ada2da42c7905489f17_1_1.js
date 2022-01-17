function exportData(){
    var array_to_export = [];
    if($("#wgt_edit").hasClass("selected")){
        $(".cont").each(function(){
            var cont_obj = new Object();
            cont_obj.text = $(this).find(".audio_desc").text();
            cont_obj.audio = $(this).find("source").attr("src");
            cont_obj.answer = $(this).find(".audio_answer").text();
            cont_obj.cur_answer = "";
            array_to_export.push(cont_obj);
        });
    } else {
        $(".cont").each(function(){
            var cont_obj = new Object();
            cont_obj.text = $(this).find(".audio_desc").text();
            cont_obj.audio = $(this).find("source").attr("src");
            cont_obj.answer = $(this).find(".imgs_cont input").val(); 
            cont_obj.cur_answer = getAnswer($(this).find(".imgs_cont"));
            array_to_export.push(cont_obj);
        });
    }
    if(window.sankore)
        sankore.setPreference("associer_sound", JSON.stringify(array_to_export));
    if($("#wgt_display").hasClass("selected")){
        if(window.sankore)
            sankore.setPreference("associer_sound_state", "display");
    }
    else{
        if(window.sankore)
            sankore.setPreference("associer_sound_state", "edit");
    }
}