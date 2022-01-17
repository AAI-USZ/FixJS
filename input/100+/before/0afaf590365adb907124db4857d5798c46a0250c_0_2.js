function normalizeKeyDescriptorString(origDescriptor) {
        var hasMacCtrl = false,
            hasCtrl = false,
            hasAlt = false,
            hasShift = false,
            key = "",
            error = false;
        
        origDescriptor.split("-").forEach(function parseDescriptor(ele, i, arr) {
            if (_isModifier("ctrl", ele, hasCtrl)) {
                if (brackets.platform === "mac") {
                    hasMacCtrl = true;
                } else {
                    hasCtrl = true;
                }
            } else if (_isModifier("cmd", ele, hasCtrl, origDescriptor)) {
                hasCtrl = true;
            } else if (_isModifier("alt", ele, hasAlt, origDescriptor)) {
                hasAlt = true;
            } else if (_isModifier("opt", ele, hasAlt, origDescriptor)) {
                console.log("KeyBindingManager normalizeKeyDescriptorString() - Opt getting mapped to Alt from: " + origDescriptor);
                hasAlt = true;
            } else if (_isModifier("shift", ele, hasShift, origDescriptor)) {
                hasShift = true;
            } else if (key.length > 0) {
                console.log("KeyBindingManager normalizeKeyDescriptorString() - Multiple keys defined. Using key: " + key + " from: " + origDescriptor);
                error = true;
            } else {
                key = ele;
            }
        });
        
        if (error) {
            return null;
        }

        // Check to see if the binding is for "-".
        if (key === "" && origDescriptor.search(/^.+--$/) !== -1) {
            key = "-";
        }
        
        // '+' char is valid if it's the only key. Keyboard shortcut strings should use
        // unicode characters (unescaped). Keyboard shortcut display strings may use
        // unicode escape sequences (e.g. \u20AC euro sign)
        if ((key.indexOf("+")) >= 0 && (key.length > 1)) {
            return null;
        }
        
        return _buildKeyDescriptor(hasMacCtrl, hasCtrl, hasAlt, hasShift, key);
    }