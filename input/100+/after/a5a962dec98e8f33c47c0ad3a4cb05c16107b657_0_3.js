function(msg)
    {
        if (this.core.getBoolPrefs("ew.errors.show", false)) {
            if (this.actionIgnore.indexOf(rc.action) == -1 && !msg.match(/(is not enabled in this region|is not supported in your requested Availability Zone)/)) {
                this.core.errorDialog("Server responded with an error for " + rc.action, rc)
            }
        }
        this.core.errorMessage(msg);
        // Add to the error list
        this.errorList.push((new Date()).strftime("%Y-%m-%d %H:%M:%S: ") + msg);
        if (this.errorList.length > 500) this.errorList.splice(0, 1);
    }