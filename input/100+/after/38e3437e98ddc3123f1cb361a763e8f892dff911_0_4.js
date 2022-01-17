function(paging) {
      var collection, finish, me, models, start;
      me = this;
      models = [];
      collection = this.getParentCollection() || this;
      paging || (paging = this.getPaging());
      start = paging.offset || 0;
      if ((paging.limit != null) && paging.limit > 0) {
        start = start + paging.limit * ((paging.page || 1) - 1);
        finish = start + paging.limit;
      }
      collection.each(function(model) {
        var pass;
        pass = me.test(model);
        if (pass) {
          return models.push(model);
        }
      });
      start = paging.offset || 0;
      if ((paging.limit != null) && paging.limit > 0) {
        start = start + paging.limit * ((paging.page || 1) - 1);
        finish = start + paging.limit;
        models = models.slice(start, finish);
      } else {
        models = models.slice(start);
      }
      this.reset(models);
      return this;
    }