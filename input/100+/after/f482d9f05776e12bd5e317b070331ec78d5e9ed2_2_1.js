function(event){
        if(this.id == "wgt_display"){
            if(!$(this).hasClass("selected")){
                $(this).addClass("selected");
                $("#wgt_edit").removeClass("selected");
                $(".style_select").css("display","none");
                if(window.sankore)    
                    sankore.enableDropOnWidget(false);
                $(".add_block").remove();
                $(".cont").each(function(){
                    var container = $(this);
                    var tmp_i = 0;
                    var tmp_right = "";
                    var tmp_array = [];
                    
                    container.find(".close_cont").remove();
                    container.find(".imgs_cont").each(function(){                        
                        $(this).find(".del_category").remove();
                        $(this).find(".add_category").remove();                        
                        $(this).removeAttr("ondragenter")
                        .removeAttr("ondragleave")
                        .removeAttr("ondragover")
                        .removeAttr("ondrop")                        
                        .find(".cat_desc").attr("disabled","disabled");
                        var tmp_count = $(this).find(".img_block").size();
                        $(this).find("input[name='count']").val(tmp_count);
                        $(this).find(".img_block").each(function(){
                            $(this).find(".close_img").remove();
                            tmp_array.push($(this));
                            $(this).remove();
                        });
                        $(this).droppable({
                            hoverClass: 'dropHere',
                            drop: function(event, ui) {
                                if($(ui.draggable).parent().parent().html() == $(this).parent().html()){
                                    var tmp_ui = $(ui.draggable).parent();
                                    checkOnDrop($(this), $(ui.draggable));
                                    checkCorrectness(tmp_ui);
                                }
                            }
                        });
                        $(this).removeAttr("style");
                    });
                    
                    var all_imgs = $("<div class='all_imgs'>").appendTo(container);
                    
                    tmp_array = shuffle(tmp_array);
                    for(var i = 0; i<tmp_array.length;i++){
                        tmp_array[i].draggable({
                            helper:'clone',
                            zIndex:100,
                            appendTo: '#data'
                        });
                        tmp_array[i].appendTo(all_imgs);
                    }
                    
                    all_imgs.droppable({
                        hoverClass: 'dropBack',
                        drop: function(event, ui) {
                            if($(ui.draggable).parent().parent().html() == $(this).parent().html()){
                                if(this != $(ui.draggable).parent()[0]){
                                    var tmp_ui = $(ui.draggable).parent();                    
                                    $(this).append($(ui.draggable));
                                    checkCorrectness(tmp_ui);
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
                $(this).addClass("selected");
                $("#wgt_display").removeClass("selected");
                $(".style_select").css("display","block");
                if(window.sankore)
                    sankore.enableDropOnWidget(true);
                $(".cont").each(function(){
                    var container = $(this);
                    
                    $("<div class='close_cont'>").appendTo(container);
                    container.find(".imgs_cont").each(function(){
                        $("<button class='del_category'>-</button>").appendTo($(this));
                        $("<button class='add_category'>+</button>").appendTo($(this));
                        $(this).attr("ondragenter", "return false;")
                        .attr("ondragleave", "$(this).css(\"background-color\",\"#E6F6FF\"); return false;")
                        .attr("ondragover", "$(this).css(\"background-color\",\"#C3E9FF\"); return false;")
                        .attr("ondrop", "$(this).css(\"background-color\",\"#E6F6FF\"); return onDropTarget(this,event);")
                        .removeClass("red_cont")
                        .removeClass("green_cont")
                        .addClass("def_cont")
                        .droppable("destroy")
                        .find(".cat_desc").removeAttr("disabled");
                        var tmp_img_cont = $(this);
                        var tmp_mask = $(this).find("input[name='mask']").val();
                        container.find(".img_block").each(function(){
                            if($(this).find("input").val() == tmp_mask){
                                $("<div class='close_img'>").appendTo($(this));
                                $(this).appendTo(tmp_img_cont);
                            }
                        });
                    });
                    container.find(".all_imgs").remove();
                });
                
                
                $("<div class='add_block'>" + sankoreLang.add + "</div>").appendTo("#data");
                $(this).css("display", "none");
                $("#wgt_display").css("display", "block");
            }
        }
    }