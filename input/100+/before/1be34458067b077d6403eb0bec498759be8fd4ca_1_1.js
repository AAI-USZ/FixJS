function(ev, ui) {
    var tag, tag_id, tag_id_m,
      _this = this;
    tag_id_m = rtagid.exec($(this).attr('data-url'));
    if (tag_id_m != null) {
      tag_id = tag_id_m[1];
    }
    return tag = Readings.catalogue.withTag(tag_id, function(tag) {
      return $(_this).Readings('list', {
        fetch: function(cb) {
          return Readings.catalogue.withBooks(tag, cb);
        },
        filter: true,
        dividers: tag.category !== 'author'
      });
    });
  }