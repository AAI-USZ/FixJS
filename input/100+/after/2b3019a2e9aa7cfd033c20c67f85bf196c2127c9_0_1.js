function () {
    $(".tab").hide();

    setupTabs();
    setupTopMenu();

    outerLayout = $('body').layout({
        applyDefaultStyles:       false
    ,   center__paneSelector:	".outer-center"
    ,	west__paneSelector:		".outer-west"
    ,	west__size:				200
    ,	north__size:			26
    ,   south__size:            26
    ,	spacing_open:			0 // ALL panes
    ,	spacing_closed:			0 // ALL panes
    //,	north__spacing_open:	0
    //,	south__spacing_open:	0
    ,	north__maxSize:			200
    ,	south__maxSize:			200
    ,   south__closable:        false
    ,   north__closable:        false
    ,   west__closable:         false
    ,   south__resizable:       false
    ,   north__resizable:       false
    ,   west__resizable:        false
    });

    var factor = 0.6;
    var dialog_height = Math.floor($(".outer-center").height()*factor);

    innerLayout = $('div.outer-center').layout({
        fxName:                 "slide"
    ,   initClosed:             true
    ,   center__paneSelector:	".inner-center"
    ,	south__paneSelector:	".inner-south"
    ,   south__size:            dialog_height
    ,	spacing_open:			5  // ALL panes
    ,	spacing_closed:			5 // ALL panes
    });

}