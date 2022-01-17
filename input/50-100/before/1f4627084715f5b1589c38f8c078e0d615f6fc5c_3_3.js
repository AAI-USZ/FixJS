function(passageId) {
        var r = this._storedReference(passageId);
        if (!step.util.isBlank(r)) {
            this._storedReference(passageId, r, false);
        } else {
            this.reference(passageId, $(".passageReference", step.util.getPassageContainer(passageId)).val(), false);
        }
    }