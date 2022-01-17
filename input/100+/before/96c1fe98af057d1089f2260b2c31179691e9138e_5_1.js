function parseDescriptor(ele, i, arr) {
            if (_isModifier("ctrl", ele, hasCtrl)) {
                hasCtrl = true;
            } else if (_isModifier("cmd", ele, hasCtrl, origDescriptor)) {
                console.log("KeyMap _normalizeKeyDescriptorString() - Cmd getting mapped to Ctrl from: " + origDescriptor);
                hasCtrl = true;
            } else if (_isModifier("alt", ele, hasAlt, origDescriptor)) {
                hasAlt = true;
            } else if (_isModifier("opt", ele, hasAlt, origDescriptor)) {
                console.log("KeyMap _normalizeKeyDescriptorString() - Opt getting mapped to Alt from: " + origDescriptor);
                hasAlt = true;
            } else if (_isModifier("shift", ele, hasShift, origDescriptor)) {
                hasShift = true;
            } else if (key.length > 0) {
                console.log("KeyMap _normalizeKeyDescriptorString() - Multiple keys defined. Using key: " + key + " from: " + origDescriptor);
            } else {
                key = ele;
            }
        }