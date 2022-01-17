function(e) {
        var orderBlock, orderedDishes, selectedSupplier, userId,
          _this = this;
        e.preventDefault();
        selectedSupplier = $('#supplier-selector').val();
        orderedDishes = [];
        orderBlock = $('#main .order');
        userId = orderBlock.find('.user').val();
        console.log(this.model);
        _.each(orderBlock.find('.dish-order'), function(item) {
          if ($(item).val()) {
            return orderedDishes.push({
              dish: $(item).attr('dishId'),
              quantity: $(item).val(),
              user: userId,
              supplier: selectedSupplier,
              order: _this.model ? _this.model.attributes.id : void 0,
              date: moment(_this.attributes.currentDay).unix()
            });
          }
        });
        if (orderedDishes.length) {
          this.userOrder.url = '/user_orders/';
          this.userOrder.create(orderedDishes);
        }
        return this.close();
      }