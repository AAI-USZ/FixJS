function(boundingBox) {

        var focusHandle = Widget._hDocFocus,
            mouseHandle = this._hDocMouseDown;

        if (focusHandle) {
            if (focusHandle.listeners > 0) {
                focusHandle.listeners--;
            } else {
                focusHandle.detach();
                Widget._hDocFocus = null;
            }
        }

        if (WEBKIT && mouseHandle) {
            mouseHandle.detach();
        }
    }