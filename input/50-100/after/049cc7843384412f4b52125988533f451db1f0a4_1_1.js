function(e, data) {
        var $begin = $('.NB-modal-submit-begin', this.$modal);
        
        this.trainer_data = data;

        if (!data || !data.length) {
            this.make_trainer_outro();
            this.reload_modal();
        } else {
          $begin.text('Begin Training')
                .addClass('NB-modal-submit-green')
                .removeClass('NB-modal-submit-grey')
                .removeClass('NB-disabled');
        }
    }