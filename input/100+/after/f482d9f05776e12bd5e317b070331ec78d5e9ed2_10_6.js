function showExample(){
    
    var li1 = $("<li>");
    var div1 = $("<div>").appendTo(li1);
    $("<div class='text_block'><div class='real_text'>" + sankoreLang.text_content + "</div></div>").draggable().appendTo(div1)
    li1.width($("#slider").width()).height($("#slider").height());
    $("#slider ul").append(li1);
    var li2 = $("<li>");
    var div2 = $("<div>").appendTo(li2);
    var img = $("<div class='img_block' style='text-align: center;'></div>").draggable().appendTo(div2);
    $("<img src=\"../../objects/1.gif\" style=\"display: inline;\" height=\"120\"/>").appendTo(img);
    li2.width($("#slider").width()).height($("#slider").height());
    $("#slider ul").append(li2);
    var li3 = $("<li>");
    var div3 = $("<div>").appendTo(li3);
    li3.width($("#slider").width()).height($("#slider").height());
    var audio_block = $("<div class='audio_block'>").draggable().appendTo(div3);
    $("<div class='play'>").appendTo(audio_block);
    $("<div class='replay'>").appendTo(audio_block);
    var source = $("<source/>").attr("src", "../../objects/bateaux.mp3");
    var audio = $("<audio>").appendTo(audio_block);
    audio.append(source);
    $("#slider ul").append(li3);
    var li4 = $("<li>");
    var div4 = $("<div>").appendTo(li4);
    $("<div class='text_block'><div class='real_text'>" + sankoreLang.text_content + "</div></div>").draggable().appendTo(div4);
    var img2 = $("<div class='img_block' style='text-align: center;'></div>").draggable().appendTo(div4);
    $("<img src=\"../../objects/1.gif\" style=\"display: inline;\" height=\"120\"/>").appendTo(img2);
    var audio_block2 = $("<div class='audio_block'>").draggable().appendTo(div4);
    $("<div class='play'>").appendTo(audio_block2);
    $("<div class='replay'>").appendTo(audio_block2);
    var source2 = $("<source/>").attr("src", "../../objects/bateaux.mp3");
    var audio2 = $("<audio>").appendTo(audio_block2);
    audio2.append(source2);
    li4.width($("#slider").width()).height($("#slider").height());
    $("#slider ul").append(li4);
    $(".text_block, .audio_block, .img_block").each(function(){
        $(this).css("position","absolute");
    });
    $("#slider").easySlider({
        prevText: '',
        nextText: '',
        controlsShow: false
    });
}