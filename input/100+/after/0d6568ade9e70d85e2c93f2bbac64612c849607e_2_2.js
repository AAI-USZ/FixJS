function parseDescriptor(ele, i, arr) {
            if (_compareModifierString("ctrl", ele, hasCtrl)) {
                if (brackets.platform === "mac") {
                    hasMacCtrl = true;
                } else {
                    hasCtrl = true;
                }
            } else if (_compareModifierString("cmd", ele, hasCtrl, origDescriptor)) {
                hasCtrl = true;
            } else if (_compareModifierString("alt", ele, hasAlt, origDescriptor)) {
                hasAlt = true;
            } else if (_compareModifierString("opt", ele, hasAlt, origDescriptor)) {
                console.log("KeyBindingManager normalizeKeyDescriptorString() - Opt getting mapped to Alt from: " + origDescriptor);
                hasAlt = true;
            } else if (_compareModifierString("shift", ele, hasShift, origDescriptor)) {
                hasShift = true;
            } else if (key.length > 0) {
                console.log("KeyBindingManager normalizeKeyDescriptorString() - Multiple keys defined. Using key: " + key + " from: " + origDescriptor);
                error = true;
            } else {
                key = ele;
            }
        }