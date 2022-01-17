function (value) {
        var me = this;
        var parentField = me.up('userFormField');
        var validationStatus = parentField.down('#validationLabel');
        if ((me.prevValue !== value) && (value !== '')) {
            me.prevValue = value;
            if (!Ext.data.validations.email({}, value)) {
                // skip server unique-email validation, invalid email format will be triggered
                validationStatus.update({type: 'error', text: 'Invalid e-mail'});
                return 'Invalid e-mail';
            } else {
                validationStatus.update({type: 'info', text: 'Valid e-mail'});
            }

            Ext.Ajax.request({
                url: parentField.validationUrl,
                method: 'GET',
                params: {
                    'userstore': parentField.validationData.userStore,
                    'email': value
                },
                success: function (response) {
                    var respObj = Ext.decode(response.responseText, true);
                    if (respObj.emailInUse) {
                        validationStatus.update({type: 'error', text: 'Not available'});
                        me.validValue = (respObj.userkey === parentField.validationData.userKey);
                    } else {
                        validationStatus.update({type: 'info', text: 'Available'});
                        me.validValue = true;
                    }
                    parentField.validate();
                }
            });
        }
        if (value === '' || value === me.currentEmail) {
            validationStatus.update({type: 'info', text: ''});
            return true;
        }
        return me.validValue || "A user with this email already exists in the userstore";
    }