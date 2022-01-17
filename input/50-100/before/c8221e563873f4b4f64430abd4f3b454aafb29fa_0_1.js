function(e) {
        e.preventDefault();
        this.emailText = $(this.el).find('textarea').val();
        this.trigger('sent');
        return $('#preview-order-form').modal('hide');
      }