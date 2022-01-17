function(){
	$('#sidebar ul.oscmenu > li > ul').each(function(){
        var $submenu = $(this);
        $submenu.parent().hover(function(){
            var menuItemHeight = 80;
            if($('body').hasClass('compact')){
                menuItemHeight = 50;
            }
            $submenu.css('margin-top',((menuItemHeight-$submenu.height())/2)-10);
        },function(){
        });
    });
    $('#sidebar ul.oscmenu > li').each(function(){
        $(this).hover(function(){
            $(this).addClass('hover');
        },function(){
            $(this).removeClass('hover');
        });
    });
    $('#show-more > ul').each(function(){
        var $submenu = $(this);
        $submenu.parent().hover(function(){
            $(this).addClass('hover');
        },function(){
            $(this).removeClass('hover');
        });
    });
    $('#hidden-menus > li').live('mouseenter',function(){
        var $submenu = $(this).find('ul');
        $(this).addClass('hover');
                    $submenu.css('top',($submenu.height()*-1)).css('margin-top','-22px');
    }).live('mouseleave',function(){
        $(this).removeClass('hover')
    });
    //Row actions
    $('.table .actions').each(function(){
        var $actions = $(this);
        var $rowActions = $('#table-row-actions');
        $(this).parents('tr').mouseenter(function(event){
            event.preventDefault();
            var $containterOffset = $('.table-contains-actions').offset();
            $thisOffset = $(this).offset();
            $rowActions.empty().append($actions.clone()).css({
                width:$(this).width()-85,
                top:($thisOffset.top-$containterOffset.top)+$(this).height()
            }).show();
            $('tr').removeClass('collapsed-hover');
            if($(this).parents('div.table-contains-actions').hasClass('table-collapsed')){
                var thatRow = $(this);
                thatRow.next().addClass('collapsed-hover');
                $rowActions.mouseleave(function(){
                    $('tr').removeClass('collapsed-hover');
                });
            }
        });
    });
    $('.table-contains-actions').mouseleave(function(){
        $('tr').removeClass('collapsed-hover');
        $('#table-row-actions').hide();
    });
    $('.table-contains-actions').mouseleave(function(event){
        $('#table-row-actions').hide();
    })
    //Close help
    $('.flashmessage .ico-close').live('click',function(){
        $(this).parents('.flashmessage').hide();
    });
    $('#help-box .ico-close').click(function(){
        $('#help-box').hide();
    });
    $('#content-head .ico-help').click(function(){
        $('#help-box').fadeIn();
    });
    $('#table-row-actions .show-more-trigger').live('click',function(){
        $(this).parent().addClass('hover');
        return false;
    });
    //Selects
	$('select').each(function(){
        selectUi($(this));
    });
    //Set Layout
	$(window).resize(function(){
	    resetLayout();
	}).resize();

    $('#flashmessage:not(:empty)').show('fast',function(){
        //$(this).hide('slow');
    });
    $('.input-has-placeholder input:not([type="hidden"])').each(function(){
        var placeHolder = $(this).prev();
        var input = $(this);
        input.focus(function(){
            placeHolder.hide();
        }).blur(function(){
            if(input.val() == ''){
                placeHolder.show();
            }else{
                placeHolder.hide();
            }
        }).triggerHandler('blur');
        placeHolder.click(function(){
            input.focus();
        });
    });
    oscTab();
    $(".close-dialog").on("click", function(){
        $(".ui-dialog-content").dialog("close");
        return false;
    });
    //Dissable
    $('.btn-disabled, *:disabled').css('opacity','0.7').live('click',function(){
        return false;
    });
    //Compact mode
    var cmode_trigger = $("#osc_toolbar_switch_mode > .trigger");
    var cmode_bg = $("#osc_toolbar_switch_mode > .background");
    if($('body').hasClass('compact')){
        cmode_trigger.stop().animate({left:24},500);
        cmode_bg.stop().animate({backgroundColor:'#00e1f2'},500);
    } else {
        cmode_trigger.stop().animate({left:0},500);
        cmode_bg.stop().animate({backgroundColor:'#f3f3f3'},500);
    }
    $("#osc_toolbar_switch_mode ").on("click", function(){
        $.getJSON(
        $(this).attr('href'),
        function(data){
            if(data.compact_mode == false){
                $('body').removeClass('compact');
                cmode_trigger.stop().animate({left:0},500);
                cmode_bg.stop().animate({backgroundColor:'#f3f3f3'},500);
            } else {
                $('body').addClass('compact');
                cmode_trigger.stop().animate({left:24},500);
                cmode_bg.stop().animate({backgroundColor:'#00e1f2'},500);
            }
            resetLayout();
        });
        return false;
    });   
}