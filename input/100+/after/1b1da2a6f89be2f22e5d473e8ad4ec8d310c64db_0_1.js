function(ev) {
    Mojo.Log.info("Creating account");
    if (this.usernameModel.value == "")
    {
        Mojo.Log.error("No username entered");
        // Mojo.Controller.errorDialog("Please enter a valid username");
        this.enableControls();
        return;
    }

    this.disableControls();

    this.controller.serviceRequest(_ValidatorAddress + "validateAccount", {
        parameters: {
            "username": this.usernameModel.value,
            "password": this.passwordModel.value,
            "prpl": this.template.prpl,
            "templateId": this.template.templateId,
            "config": this.prefs
        },
        onFailure: this.eventFail.bind(this),
        onError: this.eventFail.bind(this)
    });

    this.getEvent();
}