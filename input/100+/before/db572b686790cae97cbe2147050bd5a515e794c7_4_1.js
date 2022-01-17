function(index) {
        if (index < 0 || index > 3) {
            throw new DeveloperError('index must be between 0 and 3.');
        }

        return this.values[index];
    }