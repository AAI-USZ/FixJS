function() {
        if (this.lastOrder) {
          this.orderSend = new OrderList();
          this.orderSend.url = '/orders/' + this.lastOrder.id;
          this.orderSend.fetch();
          return this.orderSend.on('reset', this.updateOrderStatus, this);
        }
      }