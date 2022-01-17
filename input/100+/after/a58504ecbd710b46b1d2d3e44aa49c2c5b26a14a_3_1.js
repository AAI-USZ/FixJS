function formatter(i) {
  var duration, dur = secondsToTime(i.duration)
    , rating, rat = Math.round(i.rating)
    , nsfw = i.contentRating ? ' - ' + c('light_red', 'NSFW') : ''
    // Add spaces between thousands to enhance reading experience.
    , viewCount = String(i.viewCount).replace(/(\d)(?=(\d{3})+$)/g, '$1,');

  // Format rating into stars.
  rating = c('yellow', new Array(rat + 1).join('*')
         + new Array(5 - rat + 1).join(' '));

  // Format duration into hms format.
  duration = (dur.h ? dur.h + 'h' : '')
           + (dur.m ? dur.m + 'm' : '')
           + (dur.s ? dur.s + 's' : '');

  return format('%s %s by %s [%s - [%s] - %s views%s]',
    c('yellow', '└→'), i.title, c('gray', i.uploader), duration, rating, viewCount, nsfw);
}