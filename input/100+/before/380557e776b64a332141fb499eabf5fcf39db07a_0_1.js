function () {
    $(".tab").hide();

    setupTabs();
    //setupTopMenu();

    outerLayout = $('body').layout({
        applyDefaultStyles:       false
    ,   center__paneSelector:	".outer-center"
    ,	west__paneSelector:		".outer-west"
    ,	west__size:				160
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

    var factor = 0.45;
    var dialog_height = Math.floor($(".outer-center").width()*factor);

    innerLayout = $('div.outer-center').layout({
        fxName:                 "slide"
    ,   initClosed:             true
    ,   center__paneSelector:	".inner-center"
    ,	east__paneSelector:	".inner-east"
    ,   east__size:            dialog_height
    ,   east__minSize:         400
    ,	spacing_open:			5  // ALL panes
    ,	spacing_closed:			5 // ALL panes
    });

}