function resetLayout(){
    var headerHeight = 50;
    var compactModeButtonHeight = 75;
    var menuItemHeight = 80;
    var thisHeight  = $(this).height()-headerHeight;
    var $sidebar = $('#sidebar');
    
    var visible = Math.floor(((thisHeight-compactModeButtonHeight)/menuItemHeight)-2)
    $sidebar.css('height',thisHeight);
    $('#sidebar ul.oscmenu > li').show();
    

    //Footer
    if($('#content-render').height() < thisHeight ){
        $('#footer-wrapper').css('position','absolute').css('margin-bottom',-1*(thisHeight-$('#content').height()) );
        $('#sidebar').css({paddingBottom:(thisHeight-$('#content').height())});
    } else {
        fix = 0;
        if($('#content-render').height() < 600){
            fix = 600-$('#content-render').height();
        }
        $('#footer-wrapper').css({
            position:     'relative',
            marginTop:    fix,
            marginBottom: '0'
        });
        $('#sidebar').css({paddingBottom:0});

    }
    if($('body').hasClass('compact')){
        if(thisHeight < 600){
            $sidebar.css({height:'100%',position:'absolute',left:'-50px',top:0});
        } else {
            $sidebar.css({height:thisHeight,position:'fixed',left:0,top:'50px'});
        }
        $('#show-more').hide();
        $('#sidebar ul.oscmenu > li').show();
        return false;
    }
    var hidden = $('#sidebar ul.oscmenu > li:gt('+visible+')');
    $('#hidden-menus').empty().append(hidden.clone()).css('width',(hidden.length*menuItemHeight));
    hidden.hide();
    //show more only if needs
    if((visible+2) > $('#sidebar ul.oscmenu > li').length){
        $('#show-more').hide();
    } else {
       $('#show-more').show(); 
    }
    
}