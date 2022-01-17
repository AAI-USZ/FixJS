function() {
    if (!this.stream.istweets() && !this.stream.isusers() && !this.stream.isactivity()) {
      return true; //stop polling this function, not a tweet/user stream
    }
    if (this.getoption('expand-new')) {
      if (this.clicknewtweetsbar()) {
        return true;
      }
    }
    if (!this.cs.hasOwnProperty('filter')) { //first parse items in cache!
      this.poll('parseitems');
      return true;
    }
    var items = $('#stream-items-id > div[data-item-id]:not([id^=t])', this.cs.$node);                      //parse stream only once, distribute ids
    if (items.length) {
      var item, itemid, id, i, imax, tweet, user, li, reparseitems = false;
      switch(this.cs.streamItemType) {
        case 'tweet':
          for (i=0, imax=items.length, item; i<imax && (item=items.eq(i)); i++) {
            itemid = item.attr('data-item-id');
            if (itemid.indexOf(':')) {
              itemid = itemid.split(':')[0];
            }
            if (this.cs.filter.itemids.hasOwnProperty(itemid)) {
              id = this.cs.filter.itemids[itemid];
              tweet = this.cs.filter.items[id];
              item.attr('id', 't'+id);
              var tweettext = $('p.js-tweet-text', item);
              var htmltext = tweettext.html();
              if (htmltext.indexOf("\n") > -1) {
                tweettext.html(htmltext.replace(/\n/g, ' <br />')); //insert line breaks
              }
              tweet.ismedia = $("span.icons span.media", item).length > 0;
              if (tweet.ismedia) {
                li = this.cs.filter.links.indexOf(tweet.id);
                if (li > -1) {
                  tweet.haslinks = false; //treat media separately as if it had no links
                  this.cs.filter.links.splice(li, 1);
                }
                this.cs.filter.media.push(tweet.id);
              }
              $('span.tweet-full-name', item).after('<i class="tfu u'+tweet.userid+'"></i>');
              if (tweet.rt && tweet.rt.userid) {
                $('.stream-activity-line > span.user b', item).after('<i class="tfu u'+tweet.rt.userid+'"></i><span class="tf-via">via '+tweet.rt.via+'</span>');
                $('div.tweet-image', item).addClass('primary').after([
                    '<div class="tweet-image secondary">',
                      '<img width="32" height="32" data-user-id="'+tweet.rt.userid+'" class="user-profile-link js-action-profile-avatar" alt="'+tweet.rt.username+'" src="'+tweet.rt.image+'">',
                    '</div>'                  
                ].join("\n"));
              }
              if (tweet.rtcount) {
                var activityrow = $('div.tweet-row.tweet-activity-retweets', item), activityhtml;
                if (activityrow.length) {
                  if (tweet.rtcount === '100+') activityrow.addClass('tf-hot');
                  if ($('.stream-activity-line', activityrow).length) {
                    activityhtml = [
                      '<span class="tf-rtc dot divider">·</span>',
                      '<span class="tf-rtc tf-show-rt" data-hidetitle="'+_('Hide {{retweet_count}} retweers', {retweet_count:tweet.rtcount})+'">',
                        _('Show {{retweet_count}} retweeters', {retweet_count:tweet.rtcount}),
                      '</span>'
                    ].join("\n");
                    $('.stream-activity-line', activityrow).append(activityhtml);
                  } else {
                    activityhtml = [
                      '<span class="stream-activity-line tf-rtc">',
                        '<i></i>',
                        '<span class="tf-rtc tf-show-rt" data-hidetitle="'+_('Hide {{retweet_count}} retweers', {retweet_count:tweet.rtcount})+'">',
                          _('Retweeted {{retweet_count}} times', {retweet_count:tweet.rtcount}),
                        '</span>',
                      '</span>'
                    ].join("\n");
                    activityrow.html(activityhtml);
                  }
                }
              }
              $('li.action-reply-container', item)
                .before('<li class="tf-actions">'+
                     //   '<a class="tf mark" data-itemid="'+tweet.tweetid+'" title="Mark as last read"><span><i class="tf-icon"></i> <b>Mark Last Read</b></span></a>'+
//                        '<a class="tf dm" data-user="'+tweet.screenname+'" title="Direct message"><span><i class="tf-icon"></i> <b>DM</b></span></a>'+
//                        '<a class="tf quote" title="Classic Retweet"><span><i class="tf-icon"></i> <b>Classic Retweet</b></span></a>'+
                        '<a class="tf menu" title="Tweetfilter"><span><i class="tf-icon"></i> <b>Filter</b></span></a>'+
                        '</li>')
/*                .before('<a class="tf-timestamp" href="/#!/'+tweet.username+'/status/'+tweet.tweetid+'" title="'+tweet.localtime.timestamp+'">'+tweet.localtime.prettytimestamp+'</a> '+
                        '<span class="tf-usertime" title="'+tweet.localtime.timezone+'">'+tweet.localtime.time+'</span> '+
                        '<span class="tf-via">via '+tweet.via+'</span>');*/
            } else {
              reparseitems = true;      
            }
            //item = null;  
          }
          if (this.getoption('scroll-lock') && this.cs._sinceId !== this.status.scrollsinceid && this.stream.newitemsloaded) {
            this.status.scrollsinceid = this.cs._sinceId;
            this.poll('lockscroll', 5);
          }
          break;
        case 'user':
          for (i=0, imax=items.length, item; i<imax && (item=items.eq(i)); i++) {
            itemid = item.attr('data-item-id');
            if (this.cs.filter.itemids.hasOwnProperty(itemid)) {
              id = this.cs.filter.itemids[itemid];
              user = this.cs.filter.items[id];
              item.attr('id', 't'+id)
              $('span.full-name', item).after('<i class="tfu u'+user.userid+'"></i>');
            } else {
              reparseitems = true;
            }
          }
          break;
        case 'activity':
          for (i=0, imax=items.length, item; i<imax && (item=items.eq(i)); i++) {
            itemid = item.attr('data-item-id');
            if (this.cs.filter.itemids.hasOwnProperty(itemid)) {
              id = this.cs.filter.itemids[itemid];
              tweet = this.cs.filter.items[id];
              item.attr('id', 't'+id)
              switch(this._stream.namespace) {
                case 'ActivityByNetworkStream':
                  switch(tweet.action) {
                    case 'favorite':
                      $('div.stream-item-activity-line:first > img', item).wrap('<div class="tweet-image secondary"></div>')
                        .parent().before($('div.tweet-row-user:first > div.tweet-image', item).addClass('primary'));
                      break;
                    case 'follow':
                      break;
                    case 'list':
                      break;
                    case 'mention':
                      break;
                    case 'retweet':
                      break;
                  }
                break;
              }
            } else {
              reparseitems = true;
            }
          }
          break;
      }
      if (reparseitems) { //some items were not parsed, trigger a reparse
        this.poll('parseitems');
      }
      this.poll(['refreshfiltercss', 'refreshfriendscss']);
    }
    //items = null;
    return true;
  }