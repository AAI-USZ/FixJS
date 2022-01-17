function normalizeKey(ele, i, arr) {
            var val = map[ele];
            var normalizedKey = _normalizeKeyDescriptorString(ele);
            if (normalizedKey.length === 0) {
                console.log("KeyMap _normalizeMap() - Rejecting malformed key: " + ele + " (value: " + val + ")");
            } else if (!val) {
                console.log("KeyMap _normalizeMap() - Rejecting key for falsy value: " + ele + " (value: " + val + ")");
            } else if (finalMap[normalizedKey]) {
                console.log("KeyMap _normalizeMap() - Rejecting key because it was defined twice: " + ele + " (value: " + val + ")");
            } else {
                finalMap[normalizedKey] = val;
            }
        }