function(e) {
        e.preventDefault();
        this.emailText = $(this.el).find('textarea').val();
        this.trigger('sent');
        $('#preview-order-form').modal('hide');
        return $(ViewsLiteral.orderButtonView.buttonSelector).addClass('btn-success').text('Заказ отправляется...');
      }