function() {
        var copyUserOrder, dishesByCategory, userOrder,
          _this = this;
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
        copyUserOrder = void 0;
        if (this.attributes.copyData) {
          copyUserOrder = {};
          _.each(this.attributes.copyData, function(item, dishId) {
            return copyUserOrder[dishId] = _this.attributes.copyData[dishId];
          });
        }
        $(this.el).html(_.template($('#order-template').html(), {
          model: this.model,
          copyUserOrder: copyUserOrder,
          dishesByCategory: dishesByCategory,
          currentDay: this.attributes.currentDay,
          dishCategories: this.dishCategories,
          users: this.users,
          userOrder: userOrder
        }));
        if (this.attributes.userId) {
          $('#main .order .user').val(this.attributes.userId);
        }
        $(this.datepicker).val(moment(this.attributes.currentDay).add('days', 1).format('MM/DD/YYYY'));
        this.setDatepickerEvents();
        return this;
      }