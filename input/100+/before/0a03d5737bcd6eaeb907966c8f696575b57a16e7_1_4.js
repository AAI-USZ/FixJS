function updateAuthoritatively(that, termRecord) {
        if (that.hiddenInput.val() && 
            termRecord.urn === that.hiddenInput.val() && 
            that.autocompleteInput.val() === termRecord.label) {
            return;
        }
        that.hiddenInput.val(termRecord.urn);
        that.hiddenInput.change();
        fluid.log("New value " + termRecord.label);
        that.autocompleteInput.val(termRecord.label);
        that.applier.requestChange("baseRecord", fluid.copy(termRecord));
        that.applier.requestChange("term", termRecord.label);
        if (that.autocomplete) {
            that.autocomplete.suppress();
        }
    }