function() {
      var settings = this.settings;
      var lang = $('html').attr('lang');

      if (settings.pagedNav === 1 &&
          $('#auto_pagination_loader').length === 0 &&
          /MissingEnav=backwards/.test(location.search)) {
         this.gotoLastPost();
      }

      extension.addAjaxListener(function(type,list) {
         if (type === 'notes') { return; }
         $.each(list, function (i,val) {
            var node = $('#'+val);
            if (node.get(0).tagName === 'LI' && node.hasClass('post')) {
               if ($('#posts li.post[id="' + node.attr('id') + '"]')
                     .length > 1) {
                  node.remove();
               }
            }
         });
      });
      $('#posts a.like_button').live('click', function(e) {
         e.preventDefault();
      });

      if (settings.noExpandAll === 1) {
         $('head').append('<style type="text/css">' +
                          '#posts .post img.inline_external_image_off {' +
                          'cursor:pointer; }' +
                          '#posts .post img.inline_external_image_off' +
                             '.enlarged {' +
                          'cursor:default; width:auto !important;' +
                          'height:auto !important; }');
         $('#posts .post img.inline_external_image, ' +
           '#posts .post img.toggle_inline_image').mousedown(function() {
            var me = $(this);
            var cont = me.closest('.post_content');
            cont.find('.inline_external_image')
               .removeClass('inline_external_image')
               .addClass('inline_external_image_off');
            cont.find('.toggle_inline_image')
               .removeClass('toggle_inline_image')
               .addClass('toggle_inline_image_off');
            if (me.hasClass('inline_external_image_off')) {
               me.removeClass('inline_external_image_off')
                  .addClass('inline_external_image');
            }
            if (me.hasClass('toggle_inline_image_off')) {
               me.removeClass('toggle_inline_image_off')
                  .addClass('toggle_inline_image');
            }
         });
      }

      $('#posts .post_controls .reply_button').live('mouseup',function() {
         var me = $(this);
         if (!me.next().hasClass('MissingE_reply_overlay')) {
            me.after($('<div />', {"class": "MissingE_reply_overlay"}));
         }
      });

      $('#posts .post_controls .reply_button form button').live('click',
            function() {
         var me = $(this).closest('.post_controls');
         me.find('div.MissingE_reply_overlay').remove();
      });

      if (settings.widescreen === 1 &&
          !MissingE.isTumblrURL(location.href, ["settings"])) {
         var w = $('#right_column').width() + 20;
         $('head').append('<style type="text/css">' +
                          '#pagination { margin-right:-' + w + 'px; } ' +
                          '#content .tag_page_header { padding-right:' +
                          (w+40) + 'px; }</style>');
         $('#content').css('padding-right', (w+20) + 'px');
         $('#left_column').css('min-height',
                               $('#right_column').height() + 'px');
      }
      if (settings.postLinks === 1 &&
          MissingE.isTumblrURL(location.href, ["dashboardOnly"]) &&
          $('#new_post').length === 0) {
         MissingE.packages.dashboardTweaks.addPostLinks();
      }

      if (settings.reblogReplies === 1 &&
          document.body.id !== "tinymce" &&
          document.body.id !== "dashboard_edit_post") {

         $('head').append('<script type="text/javascript">' +
         'Ajax.Responders.register({' +
            'onCreate: function(request) {' +
               'var fail;' +
               'if (request.url === "/reply") {' +
                  'if ((fail = document.getElementById(\'reply_fail_\' + request.parameters.post_id))) {' +
                     'fail.className="MissingE_post_control MissingE_experimental_reply_wait";' +
                  '}' +
               '}' +
            '},' +
            'onComplete: function(response) {' +
               'var fail;' +
               'if (response.url === "/reply") {' +
                  'if ((fail = document.getElementById(\'reply_fail_\' + response.parameters.post_id))) {' +
                     'if ((btn = document.getElementById(\'post_control_reply_\' + response.parameters.post_id))) {' +
                        'btn.style.display="none";' +
                     '}' +
                     'if (response.transport.status == 200) {' +
                        'fail.className="MissingE_post_control MissingE_experimental_reply_success";' +
                     '}' +
                     'else {' +
                        'fail.className="MissingE_post_control MissingE_experimental_reply_fail";' +
                     '}' +
                  '}' +
               '}' +
            '}' +
         '});' +
         '</script>');

         extension.addAjaxListener(function(type,list) {
            if (type === 'notes') { return; }
            $.each(list, function (i, val) {
               MissingE.packages.dashboardTweaks.doReplies($('#'+val).get(0));
            });
         });
         $('#posts li.post').each(function() {
            MissingE.packages.dashboardTweaks.doReplies(this);
         });
      }

      if (settings.smallIcons === 1) {
         $('#posts .post .post_controls .popover_button')
               .live('mouseover', function() {
            MissingE.packages.dashboardTweaks
               .smallIconsZIndex($(this).closest('.post'));
         });
      }

      if (settings.replaceIcons === 1 &&
          document.body.id !== "tinymce" &&
          document.body.id !== "dashboard_edit_post") {

         $('#posts .post .post_controls a').live('mouseover', function() {
            var item = $(this);
            if (item.attr('title')) { return; }
            if (!MissingE.isTumblrURL(location.href, ["messages"]) &&
                (/delete_post_/.test(item.attr('onclick')) ||
                 /^post_delete_/.test(item.attr('id')) ||
                 (new RegExp(MissingE.getLocale(lang).dashTweaksText.del, "i")
                  .test(item.text())))) {
               item.attr('title', MissingE.getLocale(lang).dashTweaksText.del);
            }
            else if (/queue_post/.test(item.attr('onclick')) ||
                     (new RegExp(MissingE.getLocale(lang).dashTweaksText.queue,
                                 "i")).test(item.text())) {
               item.attr('title', MissingE.getLocale(lang)
                                    .dashTweaksText.queue);
            }
            else if (/^\/edit/.test(item.attr('href'))) {
               item.attr('title', MissingE.getLocale(lang).dashTweaksText.edit);
            }
            else if (/publish_post/.test(item.attr('onclick')) ||
                     /approve_post/.test(item.attr('onclick'))) {
               item.attr('title', MissingE.getLocale(lang).dashTweaksText
                                    .publish);
            }
            else if (/^ask_answer_link_/.test(item.attr('id'))) {
               item.attr('title', MissingE.getLocale(lang).dashTweaksText
                                    .answer);
            }
            else if (/^post_control_reply_/.test(item.attr('id')) &&
                     !item.attr('title')) {
               item.attr('title',
                         MissingE.getLocale(lang).dashTweaksText.reply +
                         (item.hasClass("MissingE_experimental_reply") ?
                          " [" + MissingE.getLocale(lang).dashTweaksText
                                    .experimental + "]" : ""));
            }
         });
      }

      if (settings.pagedNav === 1 &&
          $('#auto_pagination_loader').length === 0) {
         this.navigationSpacer();
         $(window).resize(this.navigationSpacer);
         if (/MissingEnav=backwards/.test(location.search)) {
            this.gotoLastPost();
         }
         window.addEventListener('keydown', function(e) {
            if (e.metaKey || e.shiftKey || e.altKey || e.ctrlKey ||
                $(e.target).is('input,textarea')) {
               return;
            }
            if (e.keyCode === 74 || e.keyCode === 75) {
               MissingE.packages.dashboardTweaks.lastPosition =
                  $(window).scrollTop();
            }
         }, true);
         window.addEventListener('keydown', function(e) {
            if (e.metaKey || e.shiftKey || e.altKey || e.ctrlKey ||
                $(e.target).is('input,textarea')) {
               return;
            }
            if (e.keyCode === 74 || e.keyCode === 75) {
               if (MissingE.packages.dashboardTweaks.lastPosition ===
                     $(window).scrollTop()) {
                  var toBtn = e.keyCode === 74 ? $('#next_page_link') :
                                 $('#previous_page_link');
                  if (toBtn.length === 0) {
                     return;
                  }
                  var toLink = toBtn.get(0).href;
                  if (e.keyCode === 75) {
                     if (/\?/.test(toLink)) {
                        toLink = toLink.replace(/\?/,'?MissingEnav=backwards&');
                     }
                     else {
                        toLink += '?MissingEnav=backwards';
                     }
                  }
                  $.globalEval(
                     'if (!key_commands_are_suspended) {' +
                        'location.href="' + toLink + '";' +
                     '}');
               }
            }
         }, false);
      }

      if (/^#post_\d+$/.test(location.hash)) {
         this.gotoPost(location.hash);
      }

      if (settings.keyboardShortcut) {
         $(window).keydown(function(e) {
            var myPid;
            // 27 = Esc, 67 = C, 69 = E, 83 = S
            if ((e.keyCode !== 67 && e.keyCode !== 27 && e.keyCode !== 69 &&
                 e.keyCode !== 83) ||
                e.metaKey || e.shiftKey || e.altKey || e.ctrlKey) {
               return;
            }
            if (e.keyCode !== 27 && $(e.target).is('input,textarea')) {
               return;
            }
            if (e.keyCode === 27) {
               myPid = e.target.id.match(/^reply_field_(\d*)$/);
               if (!myPid || myPid.length < 2) { return; }
               myPid = myPid[1];
               e.target.blur();
               return false;
            }
            var currPos = $(window).scrollTop()+7;
            $('#posts li.post:not(#new_post)').each(function() {
               var postPos = this.offsetTop;
               if (postPos === currPos) {
                  myPid = this.id.match(/post_(\d*)/);
                  if (!myPid || myPid.length < 2) { return false; }
                  myPid = myPid[1];
                  var item;
                  if (e.keyCode === 67) {
                     if (settings.smallIcons === 1) {
                        MissingE.packages.dashboardTweaks
                           .smallIconsZIndex($(this));
                     }
                     item = $('#post_control_reply_' + myPid);
                  }
                  else if (e.keyCode === 69) {
                     item = $(this).find('.post_controls a[href^="/edit/"]');
                  }
                  else if (e.keyCode === 83) {
                     item = $(this).find('.MissingEmassDeleteSelect');
                  }
                  if (!item || item.length === 0) { return false; }
                  var clickEvt = document.createEvent("MouseEvent");
                  clickEvt.initMouseEvent("click", true, true, window, 0, 0, 0,
                                          0, 0, false, false, false, false, 0,
                                          null);
                  e.preventDefault();
                  item.get(0).dispatchEvent(clickEvt);
                  return false;
               }
               if (postPos >= currPos) {
                  return false;
               }
            });
         });
      }

      if ((settings.massDelete === 1 &&
           MissingE.isTumblrURL(location.href, ["drafts", "queue", "blog"])) ||
          (settings.randomQueue === 1 &&
           MissingE.isTumblrURL(location.href, ["queue"]))) {
         var doMassDelete = settings.massDelete === 1 &&
            MissingE.isTumblrURL(location.href, ["drafts", "queue", "blog"]);
         var doRandomQueue = settings.randomQueue === 1 &&
            MissingE.isTumblrURL(location.href, ["queue"]);
         var afterguy = $('#right_column a.settings');
         var beforeguy;
         if (afterguy.length > 0) {
            beforeguy = afterguy.closest('ul').next();
         }
         else {
            beforeguy = $('#right_column a.posts').closest('ul');
            if (beforeguy.length === 0) {
               beforeguy = $('#search_form');
            }
         }
         $('head').append('<style type="text/css">' +
                 '#right_column #MissingEdraftQueueTools a { ' +
                 'background-image:url("' +
                 extension.getURL("core/dashboardTweaks/draftQueueTools.png") +
                 '") !important; }</style>');
         var btns = $('<ul />', {"class": "controls_section",
                                 id: "MissingEdraftQueueTools"});

         if (doRandomQueue) {
            btns.append($('<li />')
                           .append($('<a />',
                                     {href: "#", "class": "randomize"})
                                       .append($('<div />',
                                                 {"class": "hide_overflow",
                                                  text: MissingE.getLocale(lang).shuffle}))));
         }
         if (doMassDelete) {
            btns.append($('<li />')
                           .append($('<a />',
                                     {href: "#", "class": "select_all"})
                                       .append($('<div />',
                                                 {"class": "hide_overflow",
                                                  text: MissingE.getLocale(lang).massDelete.selectAll}))));
            btns.append($('<li />')
                           .append($('<a />',
                                     {href: "#", "class": "deselect_all"})
                                       .append($('<div />',
                                                 {"class": "hide_overflow",
                                                  text: MissingE.getLocale(lang).massDelete.deselectAll}))));
            btns.append($('<li />')
                           .append($('<a />',
                                     {href: "#", "class": "delete_selected"})
                                       .append($('<div />',
                                                 {"class": "hide_overflow",
                                                  text: MissingE.getLocale(lang).massDelete.deleteSelected}))));
         }
         btns.insertBefore(beforeguy);

         if (doMassDelete) {
            $('#posts li.post').each(function() {
               MissingE.packages.dashboardTweaks.setupMassDeletePost(this);
            });
            extension.addAjaxListener(function(type,list) {
               if (type === 'notes') { return; }
               $.each(list, function(i, val) {
                  MissingE.packages.dashboardTweaks
                     .setupMassDeletePost($('#'+val).get(0));
               });
            });
         }
         $('.move_to_top').live('click', function() {
            if ($('#posts li:first').attr('id') === "new_post" &&
                $('#posts li.post').length > 1) {
               $('#posts').find('li[id^="photo_reply_container"]').detach()
                  .insertAfter('#posts li.post:not(#new_post):first');
            }
         });
         $('#MissingEdraftQueueTools a').click(function() {
            var btn = $(this);
            if (btn.hasClass('randomize')) {
               var arr = [];
               $('#posts li.queued').each(function() {
                  arr.push(this.id.match(/\d*$/)[0]);
               });
               arr.shuffle();
               $('head').append('<script type="text/javascript">' +
                  'Sortable.setSequence("posts",["' + arr.join('","') + '"]);' +
                  'update_publish_on_times();</script>');
               if ($('#posts li:first').attr('id') === "new_post" &&
                   $('#posts li.post').length > 1) {
                  $('#posts').find('li[id^="photo_reply_container"]').detach()
                     .insertAfter('#posts li.post:not(#new_post):first');
               }
            }
            else if (btn.hasClass('select_all')) {
               $('#posts input.MissingEmassDeleteSelect').each(function() {
                  this.checked = true;
                  $(this).trigger('change');
               });
            }
            else if (btn.hasClass('deselect_all')) {
               $('#posts input.MissingEmassDeleteSelect').each(function() {
                  this.checked = false;
                  $(this).closest('li.post').removeClass('MissingEmdSelected');
               });
            }
            else if (btn.hasClass('delete_selected')) {
               var key = $('#posts input[name="form_key"]:first').val();
               var count = $('#posts li.MissingEmdSelected').length;
               if (count > 0) {
                  var sureMsg = MissingE.getLocale(lang).massDelete.postsConfirm
                                    .replace('#',count);
                  if (MissingE.getLocale(lang).massDelete.confirmReplace) {
                     var countOp = count;
                     switch(MissingE.getLocale(lang).massDelete
                              .confirmReplace.operation[0]) {
                        case "+":
                           countOp += MissingE.getLocale(lang).massDelete
                                       .confirmReplace.operation[1];
                           break;
                        case "-":
                           countOp -= MissingE.getLocale(lang).massDelete
                                       .confirmReplace.operation[1];
                           break;
                        case "%":
                           countOp %= MissingE.getLocale(lang).massDelete
                                       .confirmReplace.operation[1];
                           break;
                     }
                     if (MissingE.getLocale(lang).massDelete
                           .confirmReplace[countOp]) {
                        var r;
                        var repls = MissingE.getLocale(lang).massDelete
                                       .confirmReplace[countOp];
                        for (r in repls) {
                           if (repls.hasOwnProperty(r)) {
                              sureMsg = sureMsg.replace(r,repls[r]);
                           }
                        }
                     }
                  }
                  var sure = confirm(sureMsg);
                  if (sure) {
                     MissingE.packages.dashboardTweaks.deletePosts(key, lang);
                  }
               }
            }
            return false;
         });
         $('input.MissingEmassDeleteSelect').live('change', function() {
            var item = $(this).closest('li.post');
            if (this.checked) {
               item.addClass('MissingEmdSelected');
            }
            else {
               item.removeClass('MissingEmdSelected');
            }
         });
      }

      if (settings.sortableNotes === 1) {
         extension.addAjaxListener(function(type,thelist) {
            if (type !== 'notes') { return; }
            var container = $('#' + thelist[0]);
            var div = container.find('#' + thelist[0]
                                     .replace(/post/,"notes_container"));
            div.prepend('<div class="MissingE_notesSorter">' +
                     MissingE.escapeHTML(MissingE.getLocale(lang)
                                          .sorting.sort) + ': ' +
                     '<div class="MissingE_sorterContainer">' +
                     '<div class="MissingE_sorterButton MissingE_typeSort">' +
                     MissingE.escapeHTML(MissingE.getLocale(lang)
                                          .sorting.type) + ' ' +
                     '<span class="MissingE_upArrow">&uArr;</span>' +
                     '<span class="MissingE_downArrow">&dArr;</span>' +
                     '</div>' +
                     '<div class="MissingE_sorterButton MissingE_userSort">' +
                     MissingE.escapeHTML(MissingE.getLocale(lang)
                                          .sorting.user) + ' ' +
                     '<span class="MissingE_upArrow">&uArr;</span>' +
                     '<span class="MissingE_downArrow">&dArr;</span>' +
                     '</div></div>' +
                     '<div class="MissingE_sorterButton MissingE_unsort">' +
                      MissingE.escapeHTML(MissingE.getLocale(lang)
                                             .sorting.reset) +
                     '</div></div>');
            var node = container.find('ol.notes');
            var list = node.find('li').not('.more_notes_link_container');
            list.each(function(i) {
               $(this).attr('index',i).addClass('MissingE_sortedNote');
            });
            node.data('length',list.length);
            $(div).find(".MissingE_sorterContainer").sortable({
               items: "div",
               cursor: "move",
               axis: "x",
               opacity: 0.6,
               placeholder: 'MissingE_sorterPlaceholder',
               forcePlaceholderSize: true,
               update: function() {
                  var item = $(this);
                  var ol = item.closest("li.post").find('ol.notes');
                  var sortorder = ol.data('sortorder');
                  var newsortorder = sortorder;
                  if (!sortorder || sortorder === "" ||
                      !(/^([tT][uU]|[uU][tT])$/.test(sortorder))) {
                     sortorder = 'TU';
                  }
                  if (item.find('.MissingE_sorterButton:first')
                      .hasClass('MissingE_typeSort')) {
                     newsortorder = sortorder.match(/[tT]/)[0] +
                                    sortorder.match(/[uU]/)[0];
                  }
                  else {
                     newsortorder = sortorder.match(/[uU]/)[0] +
                                    sortorder.match(/[tT]/)[0];
                  }
                  if (newsortorder !== sortorder) {
                     ol.data('sortorder',newsortorder);
                     MissingE.packages.dashboardTweaks.styleSorters($(this)
                                         .closest('div.MissingE_notesSorter'),
                                         newsortorder);
                     MissingE.packages.dashboardTweaks.sortList(ol);
                  }
               }
            });
         });

         $('#posts ol.notes').live('mouseover', function() {
            var startIndex = $(this).data('length');
            var list = $(this).find('li:not(.MissingE_sortedNote)')
                           .not('.more_notes_link_container');
            if (list.length > 0) {
               list.each(function(i) {
                  $(this).attr('index',startIndex + i)
                     .addClass('MissingE_sortedNote');
               });
               $(this).data('length',startIndex + list.length);
               MissingE.packages.dashboardTweaks.sortList(this);
            }
         });

         $('#posts .MissingE_sorterButton').live('click', function() {
            var item = $(this);
            var ol = item.closest("li.post").find('ol.notes');
            var sortorder = ol.data('sortorder');
            if (item.hasClass('MissingE_unsort')) {
               if (sortorder && sortorder !== "") {
                  ol.data('sortorder','');
                  MissingE.packages.dashboardTweaks
                     .styleSorters($(this).parent(),'');
                  MissingE.packages.dashboardTweaks.unsortList(ol);
               }
            }
            else {
               var m;
               var newsortorder = sortorder;
               if (!sortorder || sortorder === "" ||
                   !(/^([tT][uU]|[uU][tT])$/.test(sortorder))) {
                  newsortorder = 'TU';
               }
               else if (item.hasClass('MissingE_typeSort')) {
                  m = sortorder.match(/.*([tT]).*/);
                  newsortorder = m[0].replace(/[tT]/,m[1] === "t" ? "T" : "t");
               }
               else if (item.hasClass('MissingE_userSort')) {
                  m = sortorder.match(/.*([uU]).*/);
                  newsortorder = m[0].replace(/[uU]/,m[1] === "u" ? "U" : "u");
               }
               if (newsortorder !== sortorder) {
                  ol.data('sortorder',newsortorder);
                  MissingE.packages.dashboardTweaks
                     .styleSorters($(this).closest('div.MissingE_notesSorter'),
                                   newsortorder);
                  MissingE.packages.dashboardTweaks.sortList(ol);
               }
            }
         });
      }

      if (settings.notePreview === 1) {
         $('body').append($('<div />', { id: "MissingE_preview" }));
         $('#posts li.notification .hide_overflow > a')
               .live('mouseover', function() {
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
                     noteCount = notes.text().match(/[\d\.,]+/);
                     if (noteCount && noteCount.length === 1) {
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
                     .receivePreview({success: true, pid: tid, type: type});
               }
               else if (exPhotoset.length > 0) {
                  var exImgs = [];
                  exPhotoset.find('img').each(function() {
                     exImgs.push(this.src.replace(/http:\/\/\d+\./,'http://'));
                  });
                  MissingE.packages.dashboardTweaks
                     .receivePreview({success: true, pid: tid, data: exImgs,
                                      type: "photo"});
               }
               else if (exPost.length > 0 &&
                        type === 'photo') {
                  var exImg = exPost.find('div.post_content img:first')
                                 .attr('src');
                  exImg = exImg.replace(/http:\/\/\d+\./,'http://');
                  MissingE.packages.dashboardTweaks
                     .receivePreview({success: true, pid: tid, data: [exImg],
                                      type: "photo"});
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
                                         data: screenshots, type: type});
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
         });
         $('#posts li.notification .hide_overflow > a')
               .live('mouseout', function() {
            $('#MissingE_preview').hide();
         });
      }
   }