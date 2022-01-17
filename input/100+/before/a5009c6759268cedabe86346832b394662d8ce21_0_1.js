function(item) {
          if ($(item).val() > 0) {
            return orderedDishes.push({
              dish: $(item).attr('dishId'),
              quantity: $(item).val(),
              user: userId,
              supplier: selectedSupplier,
              order: _this.model ? _this.model.attributes.id : void 0,
              date: moment(_this.attributes.currentDay).unix()
            });
          }
        }