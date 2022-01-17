function(e) {
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
      }