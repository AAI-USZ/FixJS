function (response) {
                    var respObj = Ext.decode(response.responseText, true);
                    if (respObj.userkey !== null) {
                        me.validValue = false;
                        validationStatus.update({type: 'error', text: 'Not available'});
                    } else {
                        me.validValue = true;
                        validationStatus.update({type: 'info', text: 'Available'});
                    }
                    me.validate();
                }