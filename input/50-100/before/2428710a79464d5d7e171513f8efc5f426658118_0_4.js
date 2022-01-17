function (response) {
                CONNECTED = false;
                // hash user/pass
                var hashPass = 'Basic ' + window.btoa(username + ":" + password);
                var hashStored = localStorage.getItem('basicAuthHeader');
                // compare hashPass to hashStored
                if (hashPass === hashStored) {
                    helper.loginContinue();
                } else {
                    Ext.Msg.alert("Error", "Please try again")
                }
            }