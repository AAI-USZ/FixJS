function(data) {
      var link, t, tag_list, tags, _i, _len, _ref;
      tag_list = data.tags.split(",");
      _ref = data.tags;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        t = _ref[_i];
        tags = new TagModel({
          name: t.name
        });
      }
      link = new LinkModel({
        name: data.name,
        url: data.url,
        tags: tag_list
      });
      link.on("error", this.showError, this);
      return link;
    }