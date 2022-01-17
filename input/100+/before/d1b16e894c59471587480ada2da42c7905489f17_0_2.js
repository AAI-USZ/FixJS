function exportData(){
    var array_to_export = [];
    if($("#edit").hasClass("selected")){
        $(".cont").each(function(){
            var container = $(this);
            var tmp_right = "";
            var tmp_i = 0;
            container.find(".img_block").each(function(){
                if($(this).html().match(/<img/)){
                    $(this).find("input").val(++tmp_i)
                    tmp_right += tmp_i + "*";
                }
            });
            container.find(".imgs_cont>input").val(tmp_right);
        });
    }
    $(".cont").each(function(){
        var cont_obj = new Object();
        cont_obj.style = $(".style_select").find("option:selected").val();
        cont_obj.text = $(this).find(".text_cont").text();
        cont_obj.right = $(this).find(".imgs_cont>input").val();
        cont_obj.imgs = [];
        $(this).find(".img_block").each(function(){
            var img_obj = new Object();
            img_obj.value = $(this).find("input").val();
            img_obj.link = $(this).find("img").attr("src");
            img_obj.ht = $(this).find("img").height();
            img_obj.wd = $(this).find("img").width();
            cont_obj.imgs.push(img_obj);
        });
        array_to_export.push(cont_obj);
    });
    
    if($(".cont").size() == 0){
        var cont_obj = new Object();
        cont_obj.style = $(".style_select").find("option:selected").val();
        cont_obj.tmp = "clear";
        array_to_export.push(cont_obj);
    }
    sankore.setPreference("odr_des_imgs", JSON.stringify(array_to_export));
    if($("#wgt_display").hasClass("selected"))
        sankore.setPreference("odr_des_imgs_state", "display");
    else
        sankore.setPreference("odr_des_imgs_state", "edit");
}