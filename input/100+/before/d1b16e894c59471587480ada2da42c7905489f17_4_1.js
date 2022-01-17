function exportData(){
    var array_to_export = [];
    $(".cont").each(function(){
        var cont_obj = new Object();
        cont_obj.text = $(this).find(".text_cont").text();
        cont_obj.blocks = [];
        $(this).find(".img_block, .audio_block, .text_block").each(function(){
            var tmp_block = new Object();
            if($("#wgt_display").hasClass("selected"))
                tmp_block.state = "display";
            else
                tmp_block.state = "edit";
            if($(this).hasClass("img_block")){
                if($(this).find(".audio_block").size() == 0){
                    tmp_block.src = $(this).find("img").attr("src");
                    tmp_block.hidden = $(this).find("input:hidden").val();
                    tmp_block.h = $(this).find("img").height();
                    tmp_block.w = $(this).find("img").width(); 
                    tmp_block.type = "img";
                    tmp_block.checked = $(this).find("input:checkbox").attr("checked");
                }
            }
            if($(this).hasClass("audio_block")){
                tmp_block.src = $(this).find("source").attr("src");
                tmp_block.hidden = $(this).parent().find("input:hidden").val();
                tmp_block.type = "audio";
                tmp_block.checked = $(this).find("input:checkbox").attr("checked");
            }
            if($(this).hasClass("text_block")){
                tmp_block.text = $(this).find(".text_subblock").text();
                tmp_block.hidden = $(this).find("input:hidden").val();
                tmp_block.type = "text";
                tmp_block.checked = $(this).find("input:checkbox").attr("checked");
            }           
            cont_obj.blocks.push(tmp_block);
        });
        array_to_export.push(cont_obj);
    });
    
    sankore.setPreference("selectionner", JSON.stringify(array_to_export));
}