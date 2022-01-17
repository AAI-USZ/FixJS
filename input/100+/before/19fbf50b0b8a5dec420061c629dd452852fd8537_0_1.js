function (regEx, fieldValue, errorMessage, errorField) {
        if (!regEx.test(fieldValue)) {
            errorField.html(errorMessage);
            errorField.removeClass('hide');
            return false;
        }
        return true;
    }