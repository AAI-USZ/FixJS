function(data, textStatus, jqXHR) {
      this.$el.removeClass('loading');
      this.collection.add(data);
      this.trigger('done', this.collection, data, textStatus, jqXHR);
    }