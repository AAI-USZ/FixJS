function(_super) {

      __extends(OrderView, _super);

      function OrderView() {
        return OrderView.__super__.constructor.apply(this, arguments);
      }

      OrderView.prototype.el = '#main';

      OrderView.prototype.datepicker = '.datepicker-focus';

      OrderView.prototype.copyDate = void 0;

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
        var copyData;
        e.preventDefault();
        copyData = {};
        _.each($(this.el).find('.order .dish-order'), function(item) {
          return copyData[$(item).attr('dishId')] = $(item).val();
        });
        this.undelegateEvents();
        return new OrderView({
          model: this.potentialOrder,
          attributes: {
            currentDay: this.copyDate.subtract('days', 1),
            copyData: copyData,
            userId: $(this.el).find('select.user').val()
          }
        });
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
      };

      OrderView.prototype.setDatepickerEvents = function() {
        var _this = this;
        this.getPotentialCopyDay(moment(this.attributes.currentDay).add('days', 1));
        $('.order .control-buttons .copy').text('Копировать на завтра');
        return $(this.datepicker).datepicker({
          dateFormat: "mm/dd/yy",
          onSelect: function(dateText, inst) {
            return _this.getPotentialCopyDay(dateText);
          }
        });
      };

      OrderView.prototype.getPotentialCopyDay = function(dateText) {
        var _this = this;
        this.copyDate = moment(dateText);
        $('.order .control-buttons .copy').text('Копировать на ' + this.copyDate.format('DD MMMM'));
        this.potentialCopyDay = new OrderList();
        this.potentialCopyDay.url = '/orders/' + this.copyDate.format('YYYY-MM-DD') + '/' + this.copyDate.add('days', 1).format('YYYY-MM-DD');
        this.potentialCopyDay.fetch();
        return this.potentialCopyDay.on('reset', function(order) {
          return _this.potentialOrder = order.models[0];
        });
      };

      OrderView.prototype.close = function() {
        this.undelegateEvents();
        return new WeekOrderView();
      };

      return OrderView;

    }