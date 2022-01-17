function formatter(i) {
  var nsfw = i.over_18 ? c('light_red', ' NSFW') : ''
    , url = i.is_self ? '' : i.short_url + ' '; // Show link to content if not self post.

  return format('Reddit: %s%s %s: %s [%s karma - %s comments%s]',
    url, moment(i.created_utc * 1000).fromNow(), c('gray', i.author), i.title,
    c('yellow', i.score), c('yellow', i.num_comments), nsfw);
}