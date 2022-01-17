function() {
        // Set the new current value.
        this.value = this.input.val();

        // If the input contains the placehold then abort.
        if (this.value == this.placeholder) return false;

        // If the input doesn't contain enought characters then abort.
        if (this.value.length < this.minimumCharacters) return false;

        // All clear, continue on refreshing the autocomplete.
        this.fetch();
    }