function(form) {
        formValidator.clearMessages(form);
        formValidator.validateRequiredFields(form);
        formValidator.validateDate(form);
        formValidator.validateDateBefore(form);
        validateMotherMotechId();
        formValidator.validatePhoneNumbers(form);
        return formValidator.hasErrors(form);
    }