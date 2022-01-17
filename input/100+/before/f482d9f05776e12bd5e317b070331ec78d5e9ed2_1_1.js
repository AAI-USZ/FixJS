function exportData(){
    var array_to_export = [];
    if($("#wgt_edit").hasClass("selected")){
        $(".cont").each(function(){
            var cont_obj = new Object();
            cont_obj.text = $(this).find(".audio_desc").text();
            cont_obj.audio = $(this).find("source").attr("src");
            cont_obj.mode = "edit";
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
    } else {
        $(".cont").each(function(){
            var cont_obj = new Object();
            cont_obj.text = $(this).find(".audio_desc").text();
            cont_obj.audio = $(this).find("source").attr("src");
            cont_obj.mode = "display";
            cont_obj.imgs = [];
            if($(this).find(".imgs_answers").children()[0].tagName == "DIV"){
                var tmp_cont = $(this).find(".imgs_answers").find(".img_block");
                var img_obj = new Object();
                img_obj.value = tmp_cont.find("input").val();
                img_obj.link = tmp_cont.find("img").attr("src");
                img_obj.ht = tmp_cont.find("img").height();
                img_obj.wd = tmp_cont.find("img").width();
                img_obj.cont = "answers";
                cont_obj.imgs.push(img_obj);
            }
            $(this).find(".imgs_cont .img_block").each(function(){
                var img_obj = new Object();
                img_obj.value = $(this).find("input").val();
                img_obj.link = $(this).find("img").attr("src");
                img_obj.ht = $(this).find("img").height();
                img_obj.wd = $(this).find("img").width();
                img_obj.cont = "cont";
                cont_obj.imgs.push(img_obj);
            });
            array_to_export.push(cont_obj);
        });
    }
    sankore.setPreference("associer_sound", JSON.stringify(array_to_export));
}