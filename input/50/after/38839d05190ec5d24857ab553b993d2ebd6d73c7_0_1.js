function () {
        var userField = this.up('userFormField');
        var validationTask = userField.validationTask;
        if (validationTask) {
            validationTask.delay(userField.delayValidationTime);
        }
    }