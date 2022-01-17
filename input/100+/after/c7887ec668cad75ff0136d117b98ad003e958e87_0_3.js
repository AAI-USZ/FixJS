function (arg) {
        if (arg) {
            // TODO: generate close locations based on USER
            LOCATION = Ext.getCmp('location').getValue();
            if (LOCATION === 'empty') {
                Ext.Msg.alert("", 'Please fill in the form')
            } else {
                if (LOCATION === "otherlocation") {
                    Ext.Msg.prompt("", "Please enter other location:", function (btn, text) {
                        if (btn === 'ok') {
                            LOCATION = text;
                        }
                    })
                }
                // TODO: pass LOCATION & CURR_DATE to manager
                // download all data into local storage
                this.doDownload();
                // continue to the next screen
                this.toPage(PAGES.PATIENT_LIST)
            }
        } else {
            // exit the program
            this.doExit();
        }
    }