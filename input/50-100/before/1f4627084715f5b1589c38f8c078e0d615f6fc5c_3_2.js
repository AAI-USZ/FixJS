function(passageId) {
        var v = this.version(passageId);
        if (!step.util.isBlank(v)) {
            this.version(passageId, v, false);
        } else {
            // use the pre-populated value
            this.version(passageId, $(".passageVersion", step.util.getPassageContainer(passageId)).val(), false);
        }
    }