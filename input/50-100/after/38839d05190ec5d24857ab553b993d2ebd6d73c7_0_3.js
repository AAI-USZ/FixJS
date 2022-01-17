function (response) {
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