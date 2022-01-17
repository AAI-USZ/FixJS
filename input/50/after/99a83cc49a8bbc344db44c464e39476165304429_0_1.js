function (parentId) {
        // Generating the avatar's id to be containerId_avatar
        // This is safe since there is only a single avatar at a time
        return parentId + "_avatar";
    }