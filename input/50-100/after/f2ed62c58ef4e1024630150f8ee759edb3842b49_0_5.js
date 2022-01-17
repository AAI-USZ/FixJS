function (tag) {
      var tags = this.get('tags');
      if (!tags) {
        tags = [];
      }

      tags.push({tag: tag});

      this.set('tags', tags);
      this.trigger('change');
    }