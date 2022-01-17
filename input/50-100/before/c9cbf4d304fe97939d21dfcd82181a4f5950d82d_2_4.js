function(validityEvents) {
        console.debug("XFProcessor._handleValidity validityEvents:",validityEvents);
        array.forEach(validityEvents, function(xmlEvent) {
            var control = registry.byId(xmlEvent.contextInfo.targetId);
            if (control != undefined) {
                if (xmlEvent.type == "xforms-valid") {
                    control.setValid();
                } else {
                    control.setInvalid();
                }
            }
        });
    }