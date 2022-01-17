function (instance, event) {
            $(self).triggerHandler("keyEvent", [self, event]);
            return event.defaultPrevented;   // false tells CodeMirror we didn't eat the event
        }