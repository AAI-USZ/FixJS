function() {
            var item = $(this);
            var text = item.text();
            var type, noteCount;
            var tid = this.href.match(/^(http[s]?:\/\/[^\/]*)\/post\/(\d+)/);
            if (!tid || tid.length < 3) { return; }
            var url = tid[1];
            tid = tid[2];
            var preWin = $('#MissingE_preview');
            var isNotification = false;
            for (i in MissingE.getLocale(lang).posts) {
               if (MissingE.getLocale(lang).posts.hasOwnProperty(i)) {
                  var len = MissingE.getLocale(lang).posts[i].length;
                  if (text === MissingE.getLocale(lang).posts[i][len-1]) {
                     type = i;
                     isNotification = true;
                     break;
                  }
               }
            }
            if (preWin.attr('post') !== tid && isNotification) {
               preWin.attr('post',tid);
               preWin.attr('user',url);
               preWin.empty()
                  .removeClass('MissingE_videoPreview MissingE_preview_fail')
                  .addClass('MissingE_preview_loading');
               var exPhotoset = $('#photoset_' + tid);
               var exPost = $('#post_' + tid);
               if (exPost.length > 0) {
                  var notes = $('#note_link_current_' + tid);
                  if (notes.length > 0) {
                     noteCount = notes.text().match(/\d+([,\. ]\d+)*/);
                     if (noteCount && noteCount.length >= 1) {
                        noteCount = noteCount[0];
                     }
                     else {
                        noteCount = "";
                     }
                  }
                  else {
                     noteCount = "";
                  }
               }
               if (type === "photoset") { type = "photo"; }
               if (type !== "photo" && type !== "video") {
                  MissingE.packages.dashboardTweaks
                     .receivePreview({success: true, pid: tid, type: type,
                                      noteCount: noteCount});
               }
               else if (exPhotoset.length > 0) {
                  var exImgs = [];
                  exPhotoset.find('img').each(function() {
                     exImgs.push(this.src.replace(/http:\/\/\d+\./,'http://'));
                  });
                  MissingE.packages.dashboardTweaks
                     .receivePreview({success: true, pid: tid, data: exImgs,
                                      type: "photo", noteCount: noteCount});
               }
               else if (exPost.length > 0 &&
                        type === 'photo') {
                  var exImg = exPost.find('div.post_content img:first')
                                 .attr('src');
                  exImg = exImg.replace(/http:\/\/\d+\./,'http://');
                  MissingE.packages.dashboardTweaks
                     .receivePreview({success: true, pid: tid, data: [exImg],
                                      type: "photo", noteCount: noteCount});
               }
               else if (exPost.length > 0 &&
                        type === 'video') {
                  var screenshots;
                  var exSS = exPost.find('#video_thumbnail_' + tid);
                  var embedSS = exPost.find('#video_player_' + tid + ' embed');
                  if (exSS.length > 0 && exSS.attr('thumbnails')) {
                     screenshots = exSS.attr('thumbnails')
                                       .replace(/\s*\|\s*/g,'|').split('|');
                  }
                  else if (exSS.length > 0) {
                     screenshots = [exSS.attr('src')];
                  }
                  else if (embedSS.length > 0) {
                     var flashVars = embedSS.attr('flashvars');
                     if (flashVars) {
                        var posters = flashVars.match(/poster=(http[^'"\(\)&]*)/);
                        if (posters && posters.length > 0) {
                           screenshots = posters[1].replace(/%3A/gi,':')
                                                   .replace(/%2F/gi,'/')
                                                   .split(',');
                        }
                     }
                  }
                  if (!screenshots || screenshots.length === 0) {
                     screenshots =
                        [extension.getURL('core/dashboardTweaks/black.png')];
                  }
                  if (screenshots.length === 1 &&
                      /black_100\.png$/.test(screenshots[0])) {
                     extension.sendRequest("preview",
                            {pid: tid, url: url, type: type},
                            MissingE.packages.dashboardTweaks.receivePreview);
                  }
                  else {
                     MissingE.packages.dashboardTweaks
                        .receivePreview({success: true, pid: tid,
                                         data: screenshots, type: type,
                                         noteCount: noteCount});
                  }
               }
               else {
                  extension.sendRequest("preview",
                            {pid: tid, url: url, type: type},
                            MissingE.packages.dashboardTweaks.receivePreview);
               }
            }
            else if (preWin.attr('post') !== tid) {
               return;
            }
            var offset = item.offset();
            var x = offset.left + (item.width() >> 1) - 50;
            var y = offset.top + item.height();
            preWin.css({
               'display': 'block',
               'left': x + 'px',
               'top': y + 'px'
            });
         }