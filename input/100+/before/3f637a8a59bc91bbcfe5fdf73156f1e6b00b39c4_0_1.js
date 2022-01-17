function() {
    this.postViews = this.postViews || []

    this.bind("loadMore", this.fetchAndshowLoader, this)
    this.stream.bind("fetched", this.hideLoader, this)
    this.stream.bind("fetched", this.addPosts, this)
    this.stream.bind("allItemsLoaded", this.unbindInfScroll, this)

    this.collection.bind("add", this.addPostView, this);

    var throttledScroll = _.throttle(_.bind(this.infScroll, this), 200);
    $(window).scroll(throttledScroll);
  }