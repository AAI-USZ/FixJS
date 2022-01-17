function(ev) {
    if (this.usernameModel.value == "")
    {
        this.showError("Validation", "Please enter a valid username");
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