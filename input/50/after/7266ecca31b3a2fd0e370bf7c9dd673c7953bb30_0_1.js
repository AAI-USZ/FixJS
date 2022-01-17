function() {
    $.mobile.pushStateEnabled = false; 
    $.mobile.hashListeningEnabled = false;
debug("mobile init");
    $(document).delegate('div', "pageshow", Panoptic.pageChange);
}