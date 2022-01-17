function(options, articles, cb) {

    var feed = new rss({
        title    : options.blog_title,
        feed_url : (options.base_url || '') + 'rss.xml',
        site_url : (options.base_url || ''),
        author   : options.author
        }),
        len = articles.length, i;

    for(i=0;i<len;i++) {
        feed.item({
            title : articles[i].title,
            description : articles[i].body,
            url         : (options.base_url || '') + articles[i].url,
            author      : articles[i].author,
            date        : articles[i].date
        });
    }

    this.pages['rss'] = feed.xml();

    cb();

}