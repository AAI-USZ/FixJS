function() {
    var cameraId = $(".delete_camera_button").data("camera-id");
    if (! cameraId) {
        debug("failed to find cameraId on delete button");
        return;
    }
    $(".delete_camera_button").click(function() {
        Panoptic.ajaxDelete("/api/rest/camera/" + cameraId, {}, function() {
            $.mobile.changePage("/camera/list");
        })
    });
}