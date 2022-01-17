function(_super) {

      __extends(CardDetailView, _super);

      function CardDetailView() {
        return CardDetailView.__super__.constructor.apply(this, arguments);
      }

      CardDetailView.prototype.initialize = function() {};

      CardDetailView.prototype.el = '#card-detail';

      CardDetailView.prototype.events = {
        'tap .close': 'close'
      };

      CardDetailView.prototype.render = function(card) {
        this.$el.find('#card-detail-name').html(card.name);
        return this.$el.find('#card-detail-desc').html(card.long_desc);
      };

      CardDetailView.prototype.close = function() {
        return changePage('#match', {
          transition: 'pop',
          reverse: true
        });
      };

      return CardDetailView;

    }