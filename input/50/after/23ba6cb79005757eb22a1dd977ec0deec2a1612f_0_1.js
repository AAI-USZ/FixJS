function () {
    // (lizard-ui) resize the ui
	setupLizardUi();
    // build the Ext.js controls
    this.initControls();
    // bind above-content links etc.
    this.bindUiEvents();
    this.initPreviewImage();
    // remove loading overlay
    // don't initialize Google Earth until after this is done 
    this.removeLoadingOverlay(this.initGoogleEarth.bind(this));
}