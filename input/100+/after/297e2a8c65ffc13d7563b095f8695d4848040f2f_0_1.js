function(){
    var trigger = setInterval(tabTrigger, 5000);

    $(".slide-side .yui3-tabs-trigger").mouseover(function(){
        clearInterval(trigger);
        var index = $(".slide-side .yui3-tabs-trigger").index(this);
        triggerImg(index);
    });
    $(".slide-side .yui3-tabs-trigger").mouseout(function(){
        trigger = setInterval(tabTrigger, 5000);
    });

    function tabTrigger(){
        var imgs = $(".slide-main .yui3-tabs-panel");
        var selected = $(".slide-main .yui3-tabs-panel-selected");
        var index = imgs.index(selected);
        if(++index >= imgs.length)
        {
            index = 0;
        }
        triggerImg(index);
    }

    function triggerImg(index) {
        var tabs = $(".slide-side .yui3-tabs-trigger");
        tabs.removeClass(".slide-side yui3-tabs-trigger-selected");
        var tab = tabs.eq(index);
        tab.addClass("yui3-tabs-trigger-selected");

        $(".slide-main .yui3-tabs-panel-selected").fadeOut();
        var imgs = $(".slide-main .yui3-tabs-panel");
        imgs.removeClass("yui3-tabs-panel-selected");
        var img = imgs.eq(index);
        img.addClass("yui3-tabs-panel-selected");
        $(".slide-main .yui3-tabs-panel-selected").show();
    }

   
    $(".box-app").mouseover(function(){
        if($("#app_widget").length == 0)
        {
            $("body").append("<div id='app_widget' class='yui3-widget yui3-overlay yui3-widget-positioned yui3-widget-stacked' style='z-index: 200; left: 304px; top: 438px; display:none'><div class='apps-detail-overlay yui3-overlay-content yui3-widget-stdmod'><div class='yui3-widget-bd'></div></div></div>");
        }
        $("#app_widget").css({"left":$(this).offset().left + 90});
        $("#app_widget").css({"top":$(this).offset().top - 10});
        var detail = $(this).find(".box-app-detail").html();
        $("#app_widget .yui3-widget-bd").html(detail);
        $("#app_widget").show();
        $(this).find(".app-price-line").hide();
        $(this).find(".app-download-line").show();
    });
    $(".box-app").mouseout(function(){
        $("#app_widget").hide();
        $(this).find(".app-price-line").show();
        $(this).find(".app-download-line").hide(); 
    });

    $("ol .li-rank").mouseover(function(){
        $(this).parent().find(".li-rank-bd").hide();
        $(this).find(".li-rank-bd").show();
    });
    
	$(".yui3-imagelist-arrow-left").click(function(){
            var width=206;
            var left = parseInt($("#shot-list").css("left").replace("px", ""));
            var index = left/width;
            if(index < 0)
            {
                left = left + width;
                $("#shot-list").animate({left: left + "px"});
                $(".yui3-imagelist-arrow-right").removeClass("yui3-imagelist-arrow-right-disabled");    
            }
            else
            {
                $(".yui3-imagelist-arrow-left").addClass("yui3-imagelist-arrow-left-disabled");
            }
    });
    $(".yui3-imagelist-arrow-right").click(function(){
        var width=206;
        var left = $("#shot-list").css("left").replace("px", "");
        var index = left/width;
        if(index*-1 + 3 < $("#shot-list li").length)
        {
            $("#shot-list").animate({left: (left - width) + "px"});    
            $(".yui3-imagelist-arrow-left").removeClass("yui3-imagelist-arrow-left-disabled");    
        }
        else
        {
            $(".yui3-imagelist-arrow-right").addClass("yui3-imagelist-arrow-right-disabled");
        }
    });

    $(".tabs-2-list .yui3-tabs-trigger").click(function(){
        $(".tabs-2-list .yui3-tabs-trigger").removeClass("yui3-tabs-trigger-selected");
        $(this).addClass("yui3-tabs-trigger-selected");
        $(".arti-s-bd .yui3-tabs-panel").removeClass("yui3-tabs-panel-selected");
        if($(this).html() == "简介")
        {
           $(".arti-s-bd .yui3-tabs-panel:first").addClass("yui3-tabs-panel-selected");    
        }
        else
        {
            $(".arti-s-bd .yui3-tabs-panel:last").addClass("yui3-tabs-panel-selected"); 
        }
    });

    // goto_top begin
    $("#go_top").hide();
    $(window).scroll(function(){
        if ($(window).scrollTop()>10){
            $("#go_top").fadeIn(500);
        }
        else{
            $("#go_top").fadeOut(500);
        }
    });
    $("#go_top").click(function(){
        $('body,html').animate({scrollTop:0},1000);
        return false;
    });
    // goto_top end
}