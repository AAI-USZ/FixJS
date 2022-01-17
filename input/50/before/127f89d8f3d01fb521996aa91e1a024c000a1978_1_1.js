function(feedItemCollection) {

    this.feedItemCollection = feedItemCollection;

    alert(this.feedItemCollection.size() + " feed items 1");

    $('#rss').html("");

    this.render();

  }