function resetLayout(){
    var headerHeight = 50;
    var menuItemHeight = 80;
    if($('body').hasClass('compact')){
        menuItemHeight = 50;
    }
    var height  = $(this).height()-headerHeight;
    var visible = Math.floor((height/menuItemHeight)-2)
    $('#sidebar').css('height',height);
    $('#sidebar ul.oscmenu > li').show();
    var hidden = $('#sidebar ul.oscmenu > li:gt('+visible+')');
    $('#hidden-menus').empty().append(hidden.clone()).css('width',(hidden.length*menuItemHeight));
    hidden.hide();
    //show more only if needs
    if((visible+2) > $('#sidebar ul.oscmenu > li').length){
        $('#show-more').hide();
    } else {
       $('#show-more').show(); 
    }
    //Footer
    if($('#content-render').height() < height ){
        $('#footer-wrapper').css('margin-bottom',-1*(height-$('#content-render').height()-7) );
    } else {
        $('#footer-wrapper').css({
            position:     'relative',
            marginTop:    '0',
            marginBottom: '0'
        });
    }
}