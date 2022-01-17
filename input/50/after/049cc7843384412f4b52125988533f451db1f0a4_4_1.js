function() {
        console.log(["enable_save"]);
        $('.NB-profile-save-button', this.$modal)
            .removeClass('NB-modal-submit-grey')
            .addClass('NB-modal-submit-green')
            .text('Save My Profile');
    }