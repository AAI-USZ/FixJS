function importData(data){
    var tmp = 0;    
    for(var i in data){
        if(data[i].tmp){
            changeStyle(data[i].style);
            $(".style_select").val(data[i].style);
        } else {
            if(i == 0){
                changeStyle(data[i].style);
                $(".style_select").val(data[i].style);
            }
            if(data[i].mode == "edit"){          
                var tmp_array = [];
                var container = $("<div class='cont'>");
                var sub_container = $("<div class='sub_cont'>").appendTo(container);
                var imgs_answers = $("<div class='imgs_answers imgs_answers_gray'><img src='img/drop_img.png' style='margin-top: 11px;'/></div>").appendTo(container);
                var imgs_container = $("<div class='imgs_cont'>").appendTo(container);    
        
                var number = $("<div class='number_cont'>"+ (++tmp) +"</div>").appendTo(sub_container);
                var text = $("<div class='text_cont'>" + data[i].text + "</div>").appendTo(sub_container);
        
                for(var j in data[i].imgs){
                    var img_block = $("<div class='img_block img_gray' style='text-align: center;'>");
                    var img = $("<img src='" + data[i].imgs[j].link + "' style='display: inline;'>");
                    img.height(data[i].imgs[j].ht).width(data[i].imgs[j].wd);
                    if((120 - data[i].imgs[j].ht) > 0)
                        img.css("margin",(120 - data[i].imgs[j].ht)/2 + "px 0");


                    var hidden_input = $("<input type='hidden'>").val(data[i].imgs[j].value);
                    img_block.append(hidden_input).append(img);
                    tmp_array.push(img_block);
                    
                }
                tmp_array = shuffle(tmp_array);
                for(j in tmp_array){
                    tmp_array[j].draggable({
                        helper:'clone',
                        zIndex:100,
                        appendTo: '#data'
                    });
                    tmp_array[j].appendTo(imgs_container);
                }
                imgs_answers.droppable({
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
                imgs_container.droppable({
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
                container.appendTo("#data");
            } else {
                container = $("<div class='cont'>");
                sub_container = $("<div class='sub_cont'>").appendTo(container);
                imgs_answers = $("<div class='imgs_answers'></div>").appendTo(container);
                $("<img src='img/drop_img.png' style='margin-top: 11px;'/>").appendTo(imgs_answers);
                imgs_container = $("<div class='imgs_cont'>").appendTo(container);    
        
                number = $("<div class='number_cont'>"+ (++tmp) +"</div>").appendTo(sub_container);
                text = $("<div class='text_cont'>" + data[i].text + "</div>").appendTo(sub_container);
        
                for(j in data[i].imgs){
                    img_block = $("<div class='img_block img_gray' style='text-align: center;'>");
                    img = $("<img src='" + data[i].imgs[j].link + "' style='display: inline;'>");
                    img.height(data[i].imgs[j].ht).width(data[i].imgs[j].wd);
                    if((120 - data[i].imgs[j].ht) > 0)
                        img.css("margin",(120 - data[i].imgs[j].ht)/2 + "px 0");
                    hidden_input = $("<input type='hidden'>").val(data[i].imgs[j].value);
                    img_block.append(hidden_input).append(img);
                    img_block.draggable({
                        helper:'clone',
                        zIndex:100,
                        appendTo: '#data'
                    });
                    if(data[i].imgs[j].cont == "cont")
                        img_block.appendTo(imgs_container);
                    else{
                        imgs_answers.empty();
                        img_block.appendTo(imgs_answers);
                        if(data[i].imgs[j].value == "1")
                            imgs_answers.addClass("imgs_answers_green");
                        else
                            imgs_answers.addClass("imgs_answers_red");
                    }
                }
            
                imgs_answers.droppable({
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
                imgs_container.droppable({
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
                container.appendTo("#data");
            }
        }
    }
}