function (instance, event) {
            $(self).triggerHandler("keyEvent", [self, event]);
            return false;   // false tells CodeMirror we didn't eat the event
        }