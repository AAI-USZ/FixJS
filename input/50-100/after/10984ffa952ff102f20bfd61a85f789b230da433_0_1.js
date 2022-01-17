function() {
        if (_doc) {
            var wrapper = _doc.getElementById('HTMLCS-wrapper');

            if (wrapper) {
                wrapper.parentNode.removeChild(wrapper);

                var pointerEl = pointer.pointer;
                if (pointerEl && pointerEl.parentNode) {
                    pointerEl.parentNode.removeChild(pointerEl);
                }

                if (_options.closeCallback) {
                    _messages = _options.closeCallback.call(this);
                }
            }//end if
        }//end if
    }