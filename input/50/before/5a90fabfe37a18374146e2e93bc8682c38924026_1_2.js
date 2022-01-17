function(data, textStatus, jqXHR) {
      this.collection.add(data);
      this.trigger('done', this.collection, data, textStatus, jqXHR);
    }