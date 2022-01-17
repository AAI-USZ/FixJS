function (clicked) {
        var textField = this._pTrackNode;
        if (clicked) {
            // TextFieldTTFTest be clicked
            cc.log("TextFieldTTFDefaultTest:CCTextFieldTTF attachWithIME");
            textField.attachWithIME();
        }
        else {
            // TextFieldTTFTest not be clicked
            cc.log("TextFieldTTFDefaultTest:CCTextFieldTTF detachWithIME");
            textField.detachWithIME();
        }
    }