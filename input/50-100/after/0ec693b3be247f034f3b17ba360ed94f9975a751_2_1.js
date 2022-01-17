function(boundingBox) {

        var focusHandle = Widget._hDocFocus,
            mouseHandle = this._hDocMouseDown;

        if (focusHandle) {
            if (focusHandle.listeners) {
                focusHandle.listeners--;
            }

            if (focusHandle.listeners === 0) {
                focusHandle.detach();
                Widget._hDocFocus = null;
            }
        }

        if (WEBKIT && mouseHandle) {
            mouseHandle.detach();
        }
    }