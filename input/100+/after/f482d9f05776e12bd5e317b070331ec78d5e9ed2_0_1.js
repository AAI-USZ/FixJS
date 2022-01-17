function(event){
        if(this.id == "wgt_display"){
            if(!$(this).hasClass("selected")){
                if(window.sankore)
                    sankore.enableDropOnWidget(false);
                $(this).addClass("selected");
                $("#wgt_edit").removeClass("selected");
                $(".style_select").css("display","none");
                $(".add_block").remove();
                $(".cont").each(function(){
                    var container = $(this);
                    var tmp_i = 0;
                    var tmp_array = [];
                    
                    container.find(".text_cont").removeAttr("contenteditable");
                    container.find(".add_img").remove();
                    container.find(".close_cont").remove();
                    container.find(".img_block").each(function(){
                        if($(this).find("img").attr("src") != "img/drop_img.png"){
                            $(this).find(".close_img").remove();
                            $(this).find(".clear_img").remove();
                            $(this).find(".true_img").remove();
                            $(this).find(".false_img").remove();
                            $(this).removeAttr("ondragenter")
                            .removeAttr("ondragleave")
                            .removeAttr("ondragover")
                            .removeAttr("ondrop")
                            .addClass("img_gray");
                        } else 
                            $(this).remove();
                    });
                    var img_answers = $("<div class='imgs_answers imgs_answers_gray'><img src='img/drop_img.png' style='margin-top: 11px;'/></div>").insertAfter(container.find(".sub_cont"));
                    container.find(".img_block").each(function(){
                        $(this).css("float","");
                        tmp_array.push($(this));
                    });                    
                    tmp_array = shuffle(tmp_array);
                    for(var i = 0; i<tmp_array.length;i++){
                        tmp_array[i].draggable({
                            helper:'clone',
                            zIndex:100,
                            appendTo: '#data'
                        });
                        tmp_array[i].appendTo(container.find(".imgs_cont"));
                    }
                    
                    img_answers.droppable({
                        hoverClass: 'dropHere',
                        drop: function(event, ui) {
                            if($(ui.draggable).parent().parent().html() == $(this).parent().html()){
                                if($(this).children()[0].tagName == "IMG")
                                    $(this).children().remove();
                                else
                                    $(ui.draggable).parent().append($(this).children());
                                $(this).append($(ui.draggable));  
                                if($(this).children().length == 1){                
                                    if($(this).children().find("input").val() == "1")
                                        $(this).removeClass("imgs_answers_gray")
                                        .removeClass("imgs_answers_red")
                                        .addClass("imgs_answers_green");
                                    else
                                        $(this).removeClass("imgs_answers_gray")
                                        .removeClass("imgs_answers_green")
                                        .addClass("imgs_answers_red");
                                }                    
                            }
                        }
                    });
                    
                    container.find(".imgs_cont").droppable({
                        hoverClass: 'dropBack',
                        drop: function(event, ui) {
                            if($(ui.draggable).parent().parent().html() == $(this).parent().html()){
                                if(this != $(ui.draggable).parent()[0]){
                                    var tmp_cont = $(ui.draggable).parent();
                                    $(this).append($(ui.draggable));
                                    tmp_cont.append("<img src='img/drop_img.png' style='margin-top: 11px;'/>");
                                    var answers = "";
                                    $(this).parent().find(".imgs_answers .img_block").each(function(){
                                        answers += $(this).find("input").val();
                                    });
                                    if(tmp_cont.children()[0].tagName == "IMG")
                                        tmp_cont.removeClass("imgs_answers_green")
                                        .removeClass("imgs_answers_red")
                                        .addClass("imgs_answers_gray");
                                    else
                                    if(tmp_cont.children().length == 1){                
                                        if(tmp_cont.children().find("input").val() == "1")
                                            tmp_cont.removeClass("imgs_answers_gray")
                                            .removeClass("imgs_answers_red")
                                            .addClass("imgs_answers_green");
                                        else
                                            tmp_cont.removeClass("imgs_answers_gray")
                                            .removeClass("imgs_answers_green")
                                            .addClass("imgs_answers_red");
                                    }    
                                }
                            }
                        }
                    });
                });
                
                $(this).css("display", "none");
                $("#wgt_edit").css("display", "block");
            }
        } else {            
            if(!$(this).hasClass("selected")){
                if(window.sankore)
                    sankore.enableDropOnWidget(true);
                $(this).addClass("selected");
                $("#wgt_display").removeClass("selected");
                $(".style_select").css("display","block");
                
                $(".cont").each(function(){
                    var container = $(this);
                    container.find(".imgs_answers").find(".img_block").each(function(){
                        $(this).appendTo(container.find(".imgs_cont"))
                    });
                    container.find(".imgs_answers").remove();
                    $("<div class='close_cont'>").appendTo(container);
                    container.find(".text_cont").attr("contenteditable","true");
                    //container.find(".imgs_cont").sortable("destroy");
                    //container.find(".imgs_cont").css("background-color", "white");
                    
                    var add_img = $("<div class='add_img'>");
                    container.find(".img_block").each(function(){
                        $(this).draggable("destroy");
                        $(this).attr("ondragenter", "return false;")
                        .attr("ondragleave", "$(this).css(\"background-color\",\"\"); return false;")
                        .attr("ondragover", "$(this).css(\"background-color\",\"#ccc\"); return false;")
                        .attr("ondrop", "$(this).css(\"background-color\",\"\"); return onDropTarget(this,event);")
                        .css("float","left");
                        $("<div class='close_img'>").appendTo($(this));
                        $("<div class='clear_img'>").appendTo($(this));
                        if($(this).find("input").val() == "1"){
                            $("<div class='false_img'>").appendTo($(this));
                        }
                        else{
                            $("<div class='true_img'>").appendTo($(this));
                        }
                    });
                    container.find(".imgs_cont").append(add_img)
                });                
                
                $("<div class='add_block'>" + sankoreLang.add + "</div>").appendTo("#data");
                $(this).css("display", "none");
                $("#wgt_display").css("display", "block");
            }
        }
    }