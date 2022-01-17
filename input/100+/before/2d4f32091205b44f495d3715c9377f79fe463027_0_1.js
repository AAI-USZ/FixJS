function() {
        // Abort any current request.
        if (this.xhr) this.xhr.abort();

        // Again we need this from another scope.
        var autocomplete = this;

        // Add the current value to the data dict.
        this.data[this.queryVariable] = this.value;

        // Make an asynchronous GET request to this.url.
        this.xhr = $.ajax(this.url, {
            data: this.data,
            complete: function(jqXHR, textStatus) {
                // Update and show the autocomplete.
                autocomplete.show(jqXHR.responseText);
                // Clear the current request keeper.
                autocomplete.xhr = false;
            },
        });
    }