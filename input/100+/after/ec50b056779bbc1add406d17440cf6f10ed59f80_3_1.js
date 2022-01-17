function initFeed(conf) {
  this.context.log.debug('Starting feed', conf);
  var feed = this.context.feeds[conf.name] = {conf: conf};
  var reader = feed.reader = new RSSReader(conf.url, conf.updateInterval * 1000);

  function formatArticle(a) {
    return format('%s%s %s',
     conf.prefix, a.title, a.link);
  }

  this.intervals[conf.name] = {
    name: conf.name,
    interval: conf.spamInterval * 1000,
    help: 'Spams RSS data',
    handler: function (o) {
      var a = reader.getArticle();
      if (!a) { return; }
      shorten(a.link, function (err, url) {
        if (err) { return; }
        a.link = url;
        o(a);
      });
    },
    formatter: formatArticle
  };
}