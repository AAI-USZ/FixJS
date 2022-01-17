function(model, value) {
      $(".badge", this.$el).toggleClass("badge-zero", false).text(value.get("likeCount"));
    }