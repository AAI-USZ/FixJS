function(card) {
        this.$el.find('#card-detail-name').html(card.name);
        return this.$el.find('#card-detail-desc').html(card.long_desc);
      }