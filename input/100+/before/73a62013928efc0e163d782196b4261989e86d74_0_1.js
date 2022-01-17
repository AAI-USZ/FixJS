function(event) {
    var i, submit_tags, tags,
      _this = this;
    event.preventDefault();
    tags = event.currentTarget[0].value.split(",");
    i = 0;
    while (i < tags.length) {
      tags[i] = $.trim(tags[i]);
      i++;
    }
    $("#loader").show();
    this.$el.find("#info-edit").hide();
    submit_tags = [];
    _.each(tags, function(tag) {
      return submit_tags.push({
        "name": tag
      });
    });
    if (this.model.isNew()) {
      return this.fetcher(function() {
        return _this.model.save({
          tags: submit_tags,
          source: event.currentTarget[1].value
        }, {
          success: function() {
            var show;
            _this.updateTags(submit_tags);
            $("#source").html(event.currentTarget[1].value);
            show = function() {
              $("#loader").hide();
              return $("#info-show").show();
            };
            return window.setTimeout(show, 1000);
          }
        });
      });
    }
  }