function checkPost(liPost) {
  if (typeof liPost != 'object') {
    return;
  }
  if (liPost.target) liPost = liPost.target;
  if (liPost.id == undefined) {
    return;
  }
  if (liPost.tagName!="LI") {
    return;
  }
  if (liPost.id.substring(0,4)!='post') {
    return;
  }
  if (liPost.className.indexOf('not_mine') < 0) {
    return;
  }
  if (settings['auto_unpin'] && liPost.className.indexOf('promotion_pinned') >=0) {
    unpin(liPost);
  }
  
  var savedfrom = needstobesaved(liPost.innerHTML);
  var olPosts = document.getElementById('posts');

  if (savedfrom.bL.length && savedfrom.wL.length == 0) {
    if (settings['show_notice']) {
      var author = getAuthor(liPost);

      var liRemove = document.getElementById('notification_'+liPost.id);
      if(liRemove) {
        olPosts.removeChild(liRemove);
      }

      var li_notice = document.createElement('li');
      li_notice.id = 'notification_'+liPost.id;
      li_notice.className = 'notification first_notification last_notification tumblr_savior';
      li_notice.innerHTML = '<a href="http://'+author['name']+'.tumblr.com/" class="avatar_frame"><img alt class="avatar" src="'+author['avatar']+'" /></a>';
      li_notice.innerHTML += '<div class="nipple border"></div>';
      li_notice.innerHTML += '<div class="nipple"></div>';
      li_notice.innerHTML += '<b><a href="http://'+author['name']+'.tumblr.com/">'+author['name']+'</a> posted something';
      
      if (settings['show_words']) {
        li_notice.innerHTML += ' with';
        for (var j=0;j<savedfrom.bL.length;j++) {
          if (savedfrom.bL.length>2&&j!=0&&j<savedfrom.bL.length-1){
            li_notice.innerHTML += ',';
          }
          if (savedfrom.bL.length>1&&j==savedfrom.bL.length-1) {
            li_notice.innerHTML += ' and';
          }
          li_notice.innerHTML += ' \''+savedfrom.bL[j]+'\'';
        }
        li_notice.innerHTML += ' in it';
      } else {
        li_notice.innerHTML += ' you probably didn\'t want to see';
      }
      li_notice.innerHTML += '.</b><br /><a onclick="this.parentNode.previousSibling.style.display=\'list-item\'; this.parentNode.style.display=\'none\'; return false;" href="#"><i>If you cannot resist the temptation, click here...</i></a>';

      liBuffer.push(li_notice); // We put it into a buffer so that we don't mess up the state of the posts as it's being iterated through. Gotta make sure we reconcile this after we're done.
    }
    liPost.style.display = 'none';
  } else {
    if (liPost.style.display=='none' && liPost.className.indexOf('tumblr_hate')<0) {
      liPost.style.display = 'list-item';
      if (settings['show_notice']) {
        var liRemove = document.getElementById('notification_'+liPost.id);
        if(liRemove) {
          olPosts.removeChild(liRemove);
        }
      }
    }
  }

  var divRating = document.getElementById('white_rating_'+liPost.id);
  if (divRating != null) {
    liPost.removeChild(divRating);
  }

  if (savedfrom.wL.length > 0 && settings['white_notice']) {
    whiteListed[liPost.id] = new Array();
    while (savedfrom.wL.length > 0) {
      whiteListed[liPost.id].push(savedfrom.wL.pop());
    }
    var divRating = document.createElement('div');
    divRating.id = 'white_rating_'+liPost.id;
    divRating.className = 'savior_rating whitelisted';
    divRating.innerHTML = '<img src="data:image/png;base64,'+icon+'" title="'+whiteListed[liPost.id].join(", ")+'" /><span>'+whiteListed[liPost.id].join(', ')+'</span>';
    divBuffer.push(divRating);
  }

  var divRating = document.getElementById('black_rating_'+liPost.id);
  if (divRating != null) {
    divRating.parentNode.removeChild(divRating);
  }

  if (savedfrom.bL.length > 0 && settings['black_notice']) {
    blackListed[liPost.id] = new Array();
    while (savedfrom.bL.length > 0 ) {
      blackListed[liPost.id].push(savedfrom.bL.pop());
    }
    var divRating = document.createElement('div');
    divRating.id = 'black_rating_'+liPost.id;
    divRating.className = 'savior_rating blacklisted';
    divRating.innerHTML = '<img src="data:image/png;base64,'+icon+'" title="'+blackListed[liPost.id].join(", ")+'" /><span>'+blackListed[liPost.id].join(', ')+'</span>';
    divBuffer.push(divRating);
  }

  var anchors = liPost.getElementsByTagName('a');
  if (settings['no_pagetracker']){
    for (var anchor in anchors) {
      if (anchors[anchor].outerHTML && anchors[anchor].outerHTML.indexOf('pageTracker')>=0) {
        anchors[anchor].outerHTML=anchors[anchor].outerHTML.replace(/pageTracker\._trackEvent\(.*\);/gm, " ");
      }
    }
  }

  if (settings['promoted_tags']) {
    for (var anchor in anchors) {
      if (anchors[anchor].outerHTML && anchors[anchor].outerHTML.indexOf('blingy blue')>=0) {
        anchors[anchor].outerHTML=anchors[anchor].outerHTML.replace(/blingy blue/gm, " ");
      }
    }
  }
  if (settings['promoted_posts']) {
    if (liPost.outerHTML.indexOf("promotion_highlighted")>=0) {
      promoted.push(liPost.id);
    }
  }
}