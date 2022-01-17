function _isModifier(left, right, previouslyFound, origDescriptor) {
        if (!left || !right) {
            return false;
        }
        left = left.trim().toLowerCase();
        right = right.trim().toLowerCase();
        var matched = (left.length > 0 && left === right);
        if (matched && previouslyFound) {
            console.log("KeyMap normalizeKeyDescriptorString() - Modifier defined twice: " + origDescriptor);
        }
        return matched;
    }