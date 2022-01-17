function(el, language, config, form) {

    var value = el.val();
    var optional = el.attr("data-validation-optional");
    if ((value === null || value.length == 0) && optional === 'true') {
        return true;
    }

    // Select lists with multiple options (most likely at least)
    if(typeof value == 'object') {
        var createFakeInput = function(val) {
            var fake = el.clone(false);
            fake
                .removeAttr('multiple')
                .children()
                    .remove();

            $('<option value="'+val+'" selected="selected"></option>').appendTo(fake);
            return fake;
        };
        if(!value) {
            return jQueryFormUtils.validateInput(createFakeInput(''), language, config, form);
        }
        else {
            var isValid;
            for(var i=0; i < value.length; i++) {
                isValid = jQueryFormUtils.validateInput(createFakeInput(value[i]), language, config, form);
                if(isValid !== true)
                    return isValid;
            }
            return true;
        }
    }

    value = $.trim(value);
    var validationRules = el.attr(config.validationRuleAttribute);

    // see if form element has inline err msg attribute
    var validationErrorMsg = el.attr(config.validationErrorMsgAttribute);
    
    if (typeof validationRules != 'undefined' && validationRules !== null) {

        /**
         * <input data-validation="length12" /> => getAttribute($(element).attr('class'), 'length') = 12
         * @param {String} attrValue
         * @param {String} attrName
         * @returns {Number}
         */
        var getAttributeInteger = function(attrValue, attrName) {
            var regex = new RegExp('(' + attrName + '[0-9\-]+)', "g");
            return attrValue.match(regex)[0].replace(/[^0-9\-]/g, '');
        };

        // Required
        if (validationRules.indexOf('required') > -1 && value === '') {
            // return custom inline err msg if defined
            return validationErrorMsg || language.requiredFields;
        }

        // Min length
        if (validationRules.indexOf('validate_min_length') > -1 && value.length < getAttributeInteger(validationRules, 'length')) {
            return validationErrorMsg || language.tooShortStart + getAttributeInteger(validationRules, 'length') + language.tooShortEnd;
        }

        // Max length
        if (validationRules.indexOf('validate_max_length') > -1 && value.length > getAttributeInteger(validationRules, 'length')) {
            return validationErrorMsg || language.tooLongStart + getAttributeInteger(validationRules, 'length') + language.tooLongEnd;
        }

        // Length range
        if (validationRules.indexOf('validate_length') > -1) {
            var range = getAttributeInteger(validationRules, 'length').split('-');
            if (value.length < parseInt(range[0],10) || value.length > parseInt(range[1],10)) {
                return validationErrorMsg || language.badLength + getAttributeInteger(validationRules, 'length') + language.tooLongEnd;
            }
        }

        // Email
        if (validationRules.indexOf('validate_email') > -1 && !jQueryFormUtils.validateEmail(value)) {
            return validationErrorMsg || language.badEmail;
        }

        // Domain
        else if (validationRules.indexOf('validate_domain') > -1 && !jQueryFormUtils.validateDomain(value)) {
            return validationErrorMsg || language.badDomain;
        }

        // Url
        else if (validationRules.indexOf('validate_url') > -1 && !jQueryFormUtils.validateUrl(value)) {
            return validationErrorMsg || language.badUrl;
        }

        // Float
        else if (validationRules.indexOf('validate_float') > -1 && !jQueryFormUtils.validateFloat(value)) {
            return validationErrorMsg || language.badFloat;
        }

        // Integer
        else if (validationRules.indexOf('validate_int') > -1 && !jQueryFormUtils.validateInteger(value)) {
            return validationErrorMsg || language.badInt;
        }

        // Time
        else if (validationRules.indexOf('validate_time') > -1 && !jQueryFormUtils.validateTime(value)) {
            return validationErrorMsg || language.badTime;
        }

        // Date
        else if (validationRules.indexOf('validate_date') > -1 && !jQueryFormUtils.parseDate(value, config.dateFormat)) {
            return validationErrorMsg || language.badDate;
        }

        // Birth date
        else if (validationRules.indexOf('validate_birthdate') > -1 && !jQueryFormUtils.validateBirthdate(value, config.dateFormat)) {
            return validationErrorMsg || language.badDate;
        }

        // Phone number
        else if (validationRules.indexOf('validate_phone') > -1 && !jQueryFormUtils.validatePhoneNumber(value)) {
            return validationErrorMsg || language.badTelephone;
        }

        // Swedish phone number
        else if (validationRules.indexOf('validate_swemobile') > -1 && !jQueryFormUtils.validateSwedishMobileNumber(value)) {
            return validationErrorMsg || language.badTelephone;
        }

        // simple spam check
        else if (validationRules.indexOf('validate_spamcheck') > -1 && !jQueryFormUtils.simpleSpamCheck(value, validationRules)) {
            return validationErrorMsg || language.badSecurityAnswer;
        }
        
        // UK VAT Number check
        else if (validationRules.indexOf('validate_ukvatnumber') > -1 && !jQueryFormUtils.validateUKVATNumber(value)) {
            return validationErrorMsg || language.badUKVatAnswer;
        }

        // Custom regexp validation
        if (validationRules.indexOf('validate_custom') > -1 && validationRules.indexOf('regexp/') > -1) {
            var regexp = new RegExp(validationRules.split('regexp/')[1].split('/')[0]);
            if (!regexp.test(value)) {
                return validationErrorMsg || language.badCustomVal;
            }
        }

        // Swedish social security number
        if (validationRules.indexOf('validate_swesc') > -1 && !jQueryFormUtils.validateSwedishSecurityNumber(value)) {
            return validationErrorMsg || language.badSecurityNumber;
        }

        // confirmation
        if (validationRules.indexOf('validate_confirmation') > -1 && typeof(form) != 'undefined') {
            var conf = '';
            var confInput = form.find('input[name=' + el.attr('name') + '_confirmation]').eq(0);
            if (confInput) {
                conf = confInput.val();
            }
            if (value !== conf) {
                return validationErrorMsg || language.notConfirmed;
            }
        }
    }

    return true;
}