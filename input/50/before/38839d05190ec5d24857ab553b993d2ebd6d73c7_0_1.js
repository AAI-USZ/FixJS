function () {
        var userField = this.up('userFormField');
        var validationTask = userField.validationTask;
        if (validationTask) {
            validationTask.delay(5000/*userField.delayValidationTime*/);
        }
    }