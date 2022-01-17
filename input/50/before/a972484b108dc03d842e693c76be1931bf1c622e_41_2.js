function (clicked) {
        var textField = this._pTrackNode;
        if (clicked) {
            // TextFieldTTFTest be clicked
            cc.Log("TextFieldTTFDefaultTest:CCTextFieldTTF attachWithIME");
            textField.attachWithIME();
        }
        else {
            // TextFieldTTFTest not be clicked
            cc.Log("TextFieldTTFDefaultTest:CCTextFieldTTF detachWithIME");
            textField.detachWithIME();
        }
    }