function() {
    $.mobile.pushStateEnabled = false; 
    $.mobile.hashListeningEnabled = false;
    $(document).delegate('div', "pageshow", Panoptic.pageChange);
}