function (player, options) {
    var flag = null,
        commentTitle = 'Kommentar:'
        pos = 100 * options.time / player.options.expectedDuration;
        
    if (options.user.flag && options.user.flag.length > 0) {
      switch (options.user.flag) {
        case 'tutor':
          commentTitle = 'Kommentar von unserem Tutor:';
          break;
        case 'editorial':
          commentTitle = 'Kommentar von unserer Redaktion:';
          break;
        case 'team':
          commentTitle = 'Kommentar von unserem Team:';
          break;
      }
    }
    
    return $('<div class="timed-comment" style="display: none; opacity: 0; left: ' + pos + '%"> \
                 <div class="content"> \
                   <div class="user"> \
                     <img src="' + options.user.avatar + '" width="45" height="45" />' + (options.user.flag && options.user.flag.length > 0 ? '<div class="flag ' + options.user.flag + '"></div>' : '') + ' \
                     <strong>' + options.user.name + '</strong>' + options.user.degree + ' \
                   </div> \
                   <div class="comment"> \
                     <strong>' + commentTitle + '</strong>' + options.text + ' \
                   </div> \
                   <div class="close"></div> \
                 </div> \
                 <div class="tip"></div> \
               </div>').get();
  }