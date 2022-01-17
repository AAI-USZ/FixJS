function(order) {
        if (order.sentAt === void 0) {
          return $(this.buttonSelector).removeClass('btn-warning').addClass('btn-success').text('Отправить заказ');
        } else {
          return $(this.buttonSelector).removeClass('btn-success').addClass('btn-warning').text('Заказ отправлен');
        }
      }