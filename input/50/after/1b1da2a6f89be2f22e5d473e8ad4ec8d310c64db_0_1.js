function(response) {
    Mojo.Log.error(JSON.stringify(response))
    if (response.errorCode) {
        this.controller.errorDialog(response.errorText || "");
    }
    else
    {
        this.enableControls();
        // TODO: Hide error message
    }
}