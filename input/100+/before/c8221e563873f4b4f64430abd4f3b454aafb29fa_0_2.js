function() {
        var dishesByCategory, userOrder;
        dishesByCategory = {};
        _.each(this.dishes.models, function(model) {
          if (!dishesByCategory[model.attributes.category]) {
            dishesByCategory[model.attributes.category] = [];
          }
          return dishesByCategory[model.attributes.category].push(model);
        });
        userOrder = {};
        if (this.userOrder) {
          _.each(this.userOrder.models, function(userOrderModel) {
            if (!userOrder[userOrderModel.attributes.dish]) {
              userOrder[userOrderModel.attributes.dish] = [];
            }
            return userOrder[userOrderModel.attributes.dish] = userOrderModel.attributes;
          });
        }
        $(this.el).html(_.template($('#order-template').html(), {
          model: this.model,
          dishesByCategory: dishesByCategory,
          currentDay: this.attributes.currentDay,
          dishCategories: this.dishCategories,
          users: this.users,
          userOrder: userOrder
        }));
        if (this.attributes.userId) {
          $('#main .order .user').val(this.attributes.userId);
        }
        $(this.datepicker).val(moment().add('days', 1).format('MM/DD/YYYY'));
        $(this.datepicker).datepicker();
        $(this.datepicker).datepicker({
          onSelect: function(dateText, inst) {
            return console.log(dateText);
          }
        });
        return this;
      }