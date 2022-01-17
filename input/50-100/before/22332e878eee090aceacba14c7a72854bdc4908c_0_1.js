function() {
        var newValue = this.input.val();

        // If the input contains the placehold then abort.
        if (newValue == this.placeholder) return false;

        // If the input doesn't contain enought characters then abort.
        if (newValue.length < this.minimumCharacters) return false;

        // If the input hasn't changed value then abort.
        if (newValue == this.value) return false;

        // Set the new current value.
        this.value = newValue;

        // All clear, continue on refreshing the autocomplete.
        this.fetch();
    }