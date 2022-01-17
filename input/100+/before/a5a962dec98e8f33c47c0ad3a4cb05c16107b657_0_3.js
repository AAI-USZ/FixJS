function(msg)
    {
        var now = (new Date()).getTime();
        if (this.core.getBoolPrefs("ew.errors.show", false)) {
            if (this.errorCount < this.errorMax || now - this.errorTime > this.errorTimeout) {
                if (this.actionIgnore.indexOf(rc.action) == -1 && !msg.match(/(is not enabled in this region|is not supported in your requested Availability Zone)/)) {
                    this.core.errorDialog("Server responded with an error for " + rc.action, rc)
                }
            }
        } else {
            this.core.errorMessage(msg);
        }
        this.errorTime = now;
        this.errorCount++;
        // Add to the error list
        this.errorList.push(msg);
        if (this.errorList.length > 100) this.errorList.splice(0, 1);
    }