function(order) {
        if (order.sentAt === void 0) {
          return $(this.buttonSelector).removeClass('btn-important').addClass('btn-success').text('Отправить заказ');
        } else {
          return $(this.buttonSelector).removeClass('btn-success').addClass('btn-important').text('Заказ отправлен');
        }
      }