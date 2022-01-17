function(_super) {

      __extends(OrderView, _super);

      function OrderView() {
        return OrderView.__super__.constructor.apply(this, arguments);
      }

      OrderView.prototype.el = '#main';

      OrderView.prototype.datepicker = '.datepicker-focus';

      OrderView.prototype.dishCategories = {
        1: 'Супы',
        2: 'Мясо',
        3: 'Гарниры',
        4: 'Салаты',
        5: 'Блины',
        6: 'Другое',
        7: 'Контейнеры'
      };

      OrderView.prototype.initialize = function() {
        this.users = new UserList();
        this.users.fetch();
        this.userOrder = new UserOrderList();
        if (this.attributes.userId && this.model) {
          this.userOrder.url = '/user_orders/' + this.attributes.userId + '/' + this.model.attributes.id;
          this.userOrder.fetch();
        }
        this.dishes = new DishList();
        this.dishes.fetch();
        this.render();
        this.dishes.on('reset', this.render, this);
        this.userOrder.on('reset', this.render, this);
        return this.on('updateMenu', this.initialize, this);
      };

      OrderView.prototype.events = function() {
        return {
          'click .category-dish-name': 'slideToggleMenu',
          'click .save': 'saveOrder',
          'click .copy': 'copyOrder',
          'click .cancel': 'cancelOrder',
          'click .delete': 'deleteOrder',
          'click .calendar': 'orderCalendar',
          'click .preview': 'previewOrder',
          'change select.user': 'changeUser'
        };
      };

      OrderView.prototype.changeUser = function(e) {
        var userId;
        userId = $(e.target).val();
        this.attributes.userId = userId;
        return this.trigger('updateMenu');
      };

      OrderView.prototype.slideToggleMenu = function(e) {
        e.preventDefault();
        return $(e.target).next().slideToggle();
      };

      OrderView.prototype.cancelOrder = function(e) {
        e.preventDefault();
        return this.close();
      };

      OrderView.prototype.copyOrder = function(e) {
        return e.preventDefault();
      };

      OrderView.prototype.orderCalendar = function(e) {
        e.preventDefault();
        return $(this.datepicker).focus();
      };

      OrderView.prototype.deleteOrder = function(e) {
        var _this = this;
        e.preventDefault();
        return $.ajax({
          url: '/user_orders/' + this.attributes.userId + '/' + this.model.attributes.id,
          type: 'DELETE',
          dataType: 'json',
          success: function() {
            return _this.close();
          }
        });
      };

      OrderView.prototype.saveOrder = function(e) {
        var orderBlock, orderedDishes, selectedSupplier, userId,
          _this = this;
        e.preventDefault();
        selectedSupplier = $('#supplier-selector').val();
        orderedDishes = [];
        orderBlock = $('#main .order');
        userId = orderBlock.find('.user').val();
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
      };

      OrderView.prototype.previewOrder = function(e) {
        return e.preventDefault();
      };

      OrderView.prototype.render = function() {
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
      };

      OrderView.prototype.close = function() {
        this.undelegateEvents();
        return new WeekOrderView();
      };

      return OrderView;

    }