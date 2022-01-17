function(passageId) {
        var r = this._storedReference(passageId);
        if (!step.util.isBlank(r)) {
            this._storedReference(passageId, r, false);
        } else {
            this.reference(passageId, step.defaults.passages[passageId].reference, false);
        }
    }