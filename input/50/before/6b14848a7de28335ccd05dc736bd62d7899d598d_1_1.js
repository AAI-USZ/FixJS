function(error) {
                this.autosave = true;
                this.dialogWidget.hide();
                this._showErrorMessage(error.message || ENME.getMessage("tp_publish_error", "An error occurred when trying to publish your survey"));
            }