function(event, ui) {
    if (! Panoptic.appInitRan) {
        Panoptic.appInit();
        Panoptic.appInitRan = true;
    }
    
    // clear current page timers
    if (Panoptic.pageTimers) {
        for (var i in Panoptic.pageTimers) {
            var timer = Panoptic.pageTimers[i];
            window.clearInterval(timer);
        }
    }
    
    // page initialization handlers go here
    var pageInitHandlers = {
        'home_page': Panoptic.homePageInit,
        'camera_list_page': Panoptic.cameraListInit,
        'edit_camera_dialog': Panoptic.cameraEditInit,
        'camera_view_page': Panoptic.cameraViewInit
    };
    if (event.target && event.target.id) {
        var handler = pageInitHandlers[event.target.id];
        // call page init handler
        if (handler)
            handler();
    }
}