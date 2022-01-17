function exportData(){
    var array_to_export = [];
    if($("#wgt_edit").hasClass("selected")){
        $(".cont").each(function(){
            var cont_obj = new Object();
            cont_obj.mode = "edit";
            cont_obj.conts = [];
            $(this).find(".imgs_cont").each(function(){
                var img_cont = new Object();
                cont_obj.style = $(".style_select").find("option:selected").val();
                img_cont.mask = $(this).find("input[name='mask']").val();
                img_cont.count = $(this).find(".img_block").size();
                img_cont.text = $(this).find(".cat_desc").val();
                img_cont.imgs = [];
                $(this).find(".img_block").each(function(){
                    var img_obj = new Object();
                    img_obj.value = $(this).find("input").val();
                    img_obj.text = $(this).find(".text_cont").text();
                    img_cont.imgs.push(img_obj);
                });
                cont_obj.conts.push(img_cont);
            });
            array_to_export.push(cont_obj);
        });
    } else {
        $(".cont").each(function(){
            var cont_obj = new Object();
            cont_obj.mode = "display";
            cont_obj.conts = [];
            $(this).find(".imgs_cont").each(function(){
                var img_cont = new Object();
                cont_obj.style = $(".style_select").find("option:selected").val();
                img_cont.mask = $(this).find("input[name='mask']").val();
                img_cont.count = $(this).find("input[name='count']").val();
                img_cont.text = $(this).find(".cat_desc").val();
                img_cont.imgs = [];
                $(this).find(".img_block").each(function(){
                    var img_obj = new Object();
                    img_obj.value = $(this).find("input").val();
                    img_obj.text = $(this).find(".text_cont").text();
                    img_cont.imgs.push(img_obj);
                });
                cont_obj.conts.push(img_cont);
            });
            cont_obj.all_imgs = [];
            $(this).find(".all_imgs .img_block").each(function(){
                var img = new Object();
                img.value = $(this).find("input").val();
                img.text = $(this).find(".text_cont").text();
                cont_obj.all_imgs.push(img);
            });
            array_to_export.push(cont_obj);
        });
    }
    
    if($(".cont").size() == 0){
        var cont_obj = new Object();
        cont_obj.style = $(".style_select").find("option:selected").val();
        cont_obj.tmp = "clear";
        array_to_export.push(cont_obj);
    }
    
    sankore.setPreference("categoriser_text", JSON.stringify(array_to_export));
}