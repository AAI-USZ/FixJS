function(){
    /* bind the orientationchange event globally */
    M.EventDispatcher.registerEvent(
        'orientationchange',
        $(window),
        {
            target: M.EventDispatcher,
            action: 'dispatchOrientationChangeEvent'
        },
        ['orientationchange'],
        null,
        NO,
        YES
    );

    /* init pages */
    $.mobile.initializePage();

    /* dont hide the toolbar, ever */
    $("[data-role=header][data-position=fixed]").fixedtoolbar({ hideDuringFocus: "" });
}