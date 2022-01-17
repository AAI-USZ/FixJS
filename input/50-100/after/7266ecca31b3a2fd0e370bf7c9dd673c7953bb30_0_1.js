function() {
console.log("cameraViewInit");
    var currentCamera = Panoptic.currentCamera;
    if (! currentCamera) {
        debug("currentCamera is missing in cameraViewInit");
        return;
    }

    debug("initted camera view");
    var rate = Panoptic.config.camera.live.snapshot_refresh_rate;
    window.setInterval(Panoptic.refreshLive, rate * 1000);
    window.setInterval(function() { Panoptic.updateCamera(currentCamera.id) }, rate * 1000);
    refreshLive();
    updateCamera(currentCamera.id);
}