function refreshLoadedModules() {
    if (document.readyState === 'complete' && isExtReady && google.earth) {
        clearInterval(loadInterval);
        console.log('All ready');
        kvu = new KmlViewerUi();
        kfc = new KmlFileCollection();
        // object for controlling the Google Earth time slider.
        tsc = new GETimeSliderControl();
        strc = new GEStreamingControl();
        kvu.init();
    }
}