function(event){
        if(this.id == "wgt_display"){
            if(!$(this).hasClass("selected")){
                sankore.enableDropOnWidget(false);
                $(this).addClass("selected");
                $("#wgt_edit").removeClass("selected");
                $(".style_select").css("display","none");
                $(".add_block").remove();
                $(".cont").each(function(){
                    var container = $(this);
                    var tmp_i = 0;
                    var tmp_right = "";
                    var tmp_array = [];
                    
                    container.find(".text_cont").removeAttr("contenteditable");
                    container.find(".add_img").remove();
                    container.find(".close_cont").remove();
                    container.find(".img_block").each(function(){
                        if($(this).find("img").attr("src") != "img/drop_img.png"){
                            $(this).find(".close_img").remove();
                            $(this).find(".clear_img").remove();
                            $(this).find(".numb_img").remove();
                            $(this).removeAttr("ondragenter")
                            .removeAttr("ondragleave")
                            .removeAttr("ondragover")
                            .removeAttr("ondrop");
                            $(this).find("input").val(++tmp_i)
                            tmp_right += tmp_i + "*";
                        } else 
                            $(this).remove();
                    });
                    container.find(".imgs_cont>input").val(tmp_right);
                    
                    container.find(".img_block").each(function(){
                        $(this).css("float","");
                        tmp_array.push($(this));
                    });                    
                    tmp_array = shuffle(tmp_array);
                    for(var i = 0; i<tmp_array.length;i++)
                        tmp_array[i].appendTo(container.find(".imgs_cont"));
                    container.find(".imgs_cont").sortable( {
                        update: checkResult
                    } );
                });
                $(this).css("display", "none");
                $("#wgt_edit").css("display", "block");
            }
        } else {            
            if(!$(this).hasClass("selected")){
                sankore.enableDropOnWidget(true);
                $(this).addClass("selected");
                $("#wgt_display").removeClass("selected");
                $(".style_select").css("display","block");
                $(".cont").each(function(){
                    var container = $(this);
    
                    $("<div class='close_cont'>").appendTo(container);
                    container.find(".text_cont").attr("contenteditable","true");
                    //container.find(".imgs_cont").sortable("destroy");
                    container.find(".imgs_cont").css("background-color", "");
                    
                    var add_img = $("<div class='add_img'>");
                    container.find(".img_block").each(function(){
                        $(this).attr("ondragenter", "return false;")
                        .attr("ondragleave", "$(this).css(\"background-color\",\"\"); return false;")
                        .attr("ondragover", "$(this).css(\"background-color\",\"#ccc\"); return false;")
                        .attr("ondrop", "$(this).css(\"background-color\",\"\"); return onDropTarget(this,event);")
                        //.css("float","left");
                        $("<div class='close_img'>").appendTo($(this));
                        $("<div class='clear_img'>").appendTo($(this));
                        $("<div class='numb_img'>" + $(this).find("input").val() + "</div>").appendTo($(this));
                    });
                    rightOrder(container.find(".imgs_cont"));
                    container.find(".imgs_cont").append(add_img)
                });                
                
                $("<div class='add_block'>" + sankoreLang.add + "</div>").appendTo("#data");
                $(this).css("display", "none");
                $("#wgt_display").css("display", "block");
            }
        }
    }