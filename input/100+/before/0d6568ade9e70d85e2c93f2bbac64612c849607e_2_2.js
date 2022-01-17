function parseDescriptor(ele, i, arr) {
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
        }