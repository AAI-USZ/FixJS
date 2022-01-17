function() {
        // Abort any current request.
        if (this.xhr) this.xhr.abort();

        // Again we need this from another scope.
        var autocomplete = this;

        // Add the current value to the data dict.
        this.data[this.queryVariable] = this.value;

        // Ensure that this request is different from the previous one
        changed = false;
        for(var key in this.data) {
            if (!key in this.lastData || this.data[key] != this.lastData[key]) {
                changed = true;
                break;
            }
        }

        if (!changed) return true;

        this.lastData = {};
        for(var key in this.data) {
            this.lastData[key] = this.data[key];
        }

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