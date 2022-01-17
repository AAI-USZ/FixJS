function(model) {
      $(".badge", this.$el).toggleClass("badge-zero", false).text(model.likedSong.get("likeCount"));
    }