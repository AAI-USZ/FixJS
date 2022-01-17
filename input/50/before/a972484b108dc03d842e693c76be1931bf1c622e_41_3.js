function (clicked) {
        var textField = this._pTrackNode;
        if (clicked) {
            // TextFieldTTFTest be clicked
            cc.Log("TextFieldTTFActionTest:CCTextFieldTTF attachWithIME");
            textField.attachWithIME();
        } else {
            // TextFieldTTFTest not be clicked
            cc.Log("TextFieldTTFActionTest:CCTextFieldTTF detachWithIME");
            textField.detachWithIME();
        }
    }