function resetLayout(){
    //calc how items can see
    var headerHeight = 50;
    var compactModeButtonHeight = 75;
    var menuItemHeight = 80;
    var thisHeight  = $(window).height()-headerHeight;
    var footeHeight = 57;
    var $sidebar = $('#sidebar');
    //reset vars if compact mode
    if($('body').hasClass('compact')){

    }
    //calc
    var visible = Math.floor((thisHeight-compactModeButtonHeight)/menuItemHeight)-1; //-1 for show moreBtn

    //Global actions
    $('#sidebar ul.oscmenu > li').show();
    //actions depends mode
    if($('body').hasClass('compact')){
        $('#show-more').hide();
    } else {
        var hidden = $('#sidebar ul.oscmenu > li:gt('+(visible-1)+')'); //-1 fix gt starts in 0
        console.log(hidden.length);
        if(hidden.length > 1){
            $('#hidden-menus').empty().append(hidden.clone()).css({
                width: (hidden.length*menuItemHeight)
            })
            hidden.hide();
            $('#show-more').show();
        } else {
            $('#show-more').hide(); 
        }
    }
    //global footer
    $('#content-page').css({paddingBottom:60});
    $('#sidebar').css({
            position:'fixed',
            height: '100%',
            left:0,
            top:50
        });
    var calcPaddingBtm;
    if($(window).height() < (620+headerHeight)){
        if($('body').hasClass('compact')){
            calcHeigt = $('#content-render').height();
            if(calcHeigt<620){
                calcHeigt = 620;
            }
            $('#sidebar').css({
                position:'absolute',
                height: calcHeigt,
                left:-50,
                top:0
            });
        }
        //$('#content-page').css('background-color','red');
        calcPaddingBtm = 620-($('#content-render').height())+50+10;
    } else {
        calcPaddingBtm = $(window).height()-($('#content-render').height()-10);
        //$('#content-page').css('background-color','green');
    }
    $('#content-page').css({paddingBottom:calcPaddingBtm});
}