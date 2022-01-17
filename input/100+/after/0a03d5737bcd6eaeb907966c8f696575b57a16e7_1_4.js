function updateAuthoritatively(that, termRecord) {
        if (that.hiddenInput.val() && 
            termRecord.urn === that.hiddenInput.val() && 
            that.autocompleteInput.val() === termRecord.displayName) {
            return;
        }
        that.hiddenInput.val(termRecord.urn);
        that.hiddenInput.change();
        fluid.log("New value " + termRecord.displayName);
        that.autocompleteInput.val(termRecord.displayName);
        that.applier.requestChange("baseRecord", fluid.copy(termRecord));
        that.applier.requestChange("term", termRecord.displayName);
        if (that.autocomplete) {
            that.autocomplete.suppress();
        }
    }