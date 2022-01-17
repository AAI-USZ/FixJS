function importData(data){
    
    var width = 0;
    var height = 0;
    
    for(var i in data){
        
        width = data[i].w;
        height = data[i].h;
        var li = $("<li style='float: left; width: " + data[i].w + "; height: " + data[i].h + ";'>");
        var div = $("<div>").appendTo(li);
        
        for(var j in data[i].text){
            var text_div = $("<div class='text_block'><div class='real_text'>" + data[i].text[j].val + "</div></div>");
            text_div.draggable().css("position","absolute")
            .width(data[i].text[j].w)
            .height(data[i].text[j].h)
            .css("top", data[i].text[j].top)
            .css("left", data[i].text[j].left)
            .css("font-size", data[i].text[j].fz)
            .appendTo(div);
        }
        
        for(j in data[i].imgs){
            var img_div = $("<div class='img_block' style='text-align: center;'>");            
            img_div.draggable().css("position","absolute")
            .width(data[i].imgs[j].block_w)
            .height(data[i].imgs[j].block_h)
            .css("top", data[i].imgs[j].top)
            .css("left", data[i].imgs[j].left)
            .appendTo(div);
            $("<img src='../../" + data[i].imgs[j].link + "' style='display: inline;' width='" + data[i].imgs[j].w + "' height='" + data[i].imgs[j].h + "'/>").appendTo(img_div);
        }
        
        for(j in data[i].audio){
            var audio_div = $("<div class='audio_block'>");
            $("<div class='play'>").appendTo(audio_div);
            $("<div class='replay'>").appendTo(audio_div);
            var tmp_audio = $("<audio>").appendTo(audio_div);
            $("<source src='../../" + data[i].audio[j].val + "' />").appendTo(tmp_audio);
            audio_div.draggable().css("position","absolute")
            .css("top", data[i].audio[j].top)
            .css("left", data[i].audio[j].left)
            .appendTo(div);
        }
        
        $("#slider ul").append(li);
        
    }
    
    $(window).trigger("resize")
    
    $("#slider").width(width).height(height).easySlider({
        prevText: '',
        nextText: '',
        controlsShow: false
    });
    $("#slider").goToSlide(sankore.preference("etudier_cur_page",""));
    $("#prevBtn a").css("display", sankore.preference("etudier_left_nav",""));
    $("#nextBtn a").css("display", sankore.preference("etudier_right_nav",""));
}