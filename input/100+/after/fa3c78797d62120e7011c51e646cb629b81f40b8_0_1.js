function() {
      var i;
      var settings = this.settings;
      if (document.body.id !== 'dashboard_edit_post') {
         if (/[\?&]channel_id=/.test(location.href) &&
             /Request denied/i.test($('#container').text())) {
            var blog = location.href.match(/[\?&]channel_id=([^&]*)/)[1];
            $('<p>You attempted to reblog using Tumblr username:<br />' +
              '<strong>' + MissingE.escapeHTML(blog) + '</strong></p>' +
              '<p>This may not be a valid username!<br />' +
              'Please check your <em>Missing e</em> settings.</p>')
                  .insertBefore('#container div.sorry p:last');
         }
         return false;
      }
      if (settings.fullText === 1 &&
          $('#edit_post').hasClass('link_post')) {
         var src = encodeURIComponent($('#post_two').val());
         if (document.referrer.indexOf("src="+src) >= 0 ||
             (document.referrer === "" &&
              location.href.indexOf("redirect_to="+src) >= 0)) {
            location.href = $('#the_as_links a[href*="/text"]').get(0).href;
            return;
         }
      }
      var addHeight = 0;
      var lang = $('html').attr('lang');
      if (MissingE.packages.betterReblogsFill.isTagOverride()) {
         $('#post_tags').val("");
         $('#tokens').empty();
         MissingE.packages.betterReblogsFill.clearTagOverride();
      }
      if (settings.passTags === 0) {
         MissingE.packages.betterReblogsFill.clearReblogTags();
      }
      var tags = MissingE.packages.betterReblogsFill.getReblogTags();
      if (tags.length === 0) {
         MissingE.packages.betterReblogsFill
            .setReblogTagsPlainText(document.getElementById('post_tags').value);
      }
      tags = MissingE.packages.betterReblogsFill.getReblogTags();
      if (settings.tagReblogs === 1 && settings.reblogTags !== "") {
         for (i=0; i<settings.reblogTags.length; i++) {
            if ($.inArray(settings.reblogTags[i],tags) === -1) {
               tags.push(settings.reblogTags[i]);
            }
         }
         MissingE.packages.betterReblogsFill.setReblogTags(tags);
      }

      if (document.body.id === 'dashboard_edit_post') {
         $('#the_as_links a[href!="#"]').click(function() {
            var pt = document.getElementById('post_tags').value;
            if (pt && pt !== '') {
               MissingE.packages.betterReblogsFill.setReblogTagsPlainText(pt);
            }
            else if (tags && tags.length > 0) {
               MissingE.packages.betterReblogsFill.setReblogTags(tags);
            }
         });

         var askName = location.search.match(/MissingEaskName=([^&]*)/);
         var askerName = location.search.match(/MissingEaskerName=([^&]*)/);
         var askPost = location.search.match(/MissingEaskPost=([^&]*)/);
         var askSure = location.search.match(/MissingEaskSure=([^&]*)/);
         var pt;
         if (askSure && askSure.length > 1 && askSure[1] === "0") {
            if (askName && askName.length > 1 &&
                askPost && askPost.length > 1 &&
                $('#left_column').children("div.post_question").length !== 0) {
               pt = document.getElementById('post_tags').value;
               if (pt && pt !== '') {
                  MissingE.packages.betterReblogsFill
                     .setReblogTagsPlainText(pt);
               }
               else if (tags && tags.length > 0) {
                  MissingE.packages.betterReblogsFill.setReblogTags(tags);
               }
               location.href = location.href.replace(/MissingEaskSure=0&/,'')
                                    .replace(/(\/text)?\?/,"/text?");
               return;
            }
         }
         else if (!askName || askName.length < 2 || !askPost ||
                  askPost.length < 2) {
            if ($('#left_column').children("div.post_question").length !== 0) {
               pt = document.getElementById('post_tags').value;
               if (pt && pt !== '') {
                  MissingE.packages.betterReblogsFill
                     .setReblogTagsPlainText(pt);
               }
               else if (tags && tags.length > 0) {
                  MissingE.packages.betterReblogsFill.setReblogTags(tags);
               }
               askName = document.referrer.match(/[&\?]name=([^&]*)/);
               askerName = $('#left_column .post_question_asker:first').text();
               askPost = location.search.match(/redirect_to=([^&]*)/);
               if (askPost && askPost.length > 1 &&
                   askName && askName.length > 1) {
                  var addSearch = "&MissingEaskerName=" + askerName +
                     "&MissingEaskPost=" + askPost[1] + "&MissingEaskName=" +
                     askName[1];
                  location.href = location.href.replace(/(\/text)?\?/,"/text?") +
                                    addSearch;
                  return;
               }
            }
         }
         else if (askName && askName.length > 1 &&
                  askPost && askPost.length > 1) {
            if (!(/[\?\&]post%5[bB]one%5[dD]/.test(location.search))) {
               var postone = $('#post_one').val();
               var question = "";
               postone = MissingE.unescapeHTML(postone.replace(/<[^>]*>/g,''));
               for (i=0; i<MissingE.getLocale(lang).asked.length; i++) {
                  if (i>0) {
                     question += " ";
                  }
                  if (MissingE.getLocale(lang).asked[i] === "U") {
                     question += askerName[1];
                  }
                  else {
                     question += MissingE.escapeHTML(MissingE.getLocale(lang)
                                                      .asked[i]);
                  }
               }
               question += ": " + postone;
               $('#post_one').val(question);
            }
            var title = $('#left_column h1:first');
            title.find('span.as_links').remove();
            title.html(title.html()
                        .replace(/[^<]*/,
                                 MissingE.escapeHTML(MissingE.getLocale(lang)
                                                      .reblogAsk)));
            $('head').append('<script type="text/javascript">' +
                          'var ta = document.getElementById("post_two");' +
                          'if (tinyMCE && (ed = tinyMCE.get("post_two"))) {' +
                             'var val = \'<p><a href="' +
                                    decodeURIComponent(askPost[1]) +
                                    '" class="tumblr_blog">' + askName[1] +
                                    '</a>:</p>\\n\\n<blockquote>\'' +
                                    ' + ta.value + \'</blockquote>\\n\\n' +
                                    '<p></p>\';' +
                             'ed.execCommand("mceReplaceContent", false, ' +
                                             'val);' +
                          '}' +
                          'else {' +
                             'ta.value = \'<p><a href="' +
                                         decodeURIComponent(askPost[1]) +
                                         '" class="tumblr_blog">' + askName[1] +
                                         '</a>:</p>\\n\\n<blockquote>\'' +
                                         ' + ta.value + \'</blockquote>\\n\\n' +
                                         '<p></p>\';' +
                          '}' +
                          '</script>');
         }
      }

      if (document.body.id === 'dashboard_edit_post' &&
          MissingE.packages.betterReblogsFill.getReblogTags().length > 0) {
         if (tags.length > 0) {
            var func = "var tags=[";
            for (i=0; i<tags.length; i++) {
               if (tags[i] !== undefined && tags[i] !== null && tags[i] !== ''){
                  func += '\'' + tags[i].replace(/'/g,'\\\'').replace(/"/g,'\\\'') + '\',';
               }
            }
            func = func.replace(/,$/,'') + '];';
            var func2 = "var reblogTags=[";
            for (i=0; i<settings.reblogTags.length; i++) {
               if (settings.reblogTags[i] !== undefined &&
                   settings.reblogTags[i] !== null &&
                   settings.reblogTags[i] !== ''){
                  func2 += '\'' + settings.reblogTags[i].replace(/'/g,'\\\'').replace(/"/g,'\\\'') + '\',';
               }
            }
            func2 = func2.replace(/,$/,'') + '];';
            func += func2;
            var label;
            if (func !== 'var tags=[];') {
               func += 'if (typeof tagReblog !== \'undefined\' && tagReblog) { tags=reblogTags; }' +
                       'var posttags=document.getElementById(\'post_tags\');' +
                       'var currtags=posttags.value.split(\',\');' +
                       'if (currtags[0] === \'\') { currtags.splice(0,1); }' +
                       'var addtags=[];' +
                       'for(i=0;i<tags.length;i++){' +
                        'var f=false;' +
                        'for(j=0;j<currtags.length;j++){' +
                         'if(tags[i]===currtags[j]){' +
                          'f=true;break;' +
                         '}' +
                        '}' +
                        'if(!f){addtags.push(tags[i]);}' +
                       '}' +
                       'if(addtags.length>0){' +
                        'if($(\'post_tags_label\')){' +
                         'Element.remove(\'post_tags_label\');' +
                        '}' +
                        'currtags=currtags.concat(addtags);' +
                        'posttags.value=currtags.join(\',\');' +
                        'for(i=0;i<addtags.length;i++){' +
                         'var newtoken=document.createElement(\'div\');' +
                         'newtoken.className=\'token\';' +
                         'var span=document.createElement(\'span\');' +
                         'span.className=\'tag\';' +
                         'span.textContent=addtags[i];' +
                         'newtoken.appendChild(span);' +
                         'var rem=document.createElement(\'a\');' +
                         'rem.href=\'#\';rem.textContent=\'x\';' +
                         'rem.onclick=' +
                           'function(){tag_editor_remove_tag($(this).up());' +
                            'return false;};' +
                         'newtoken.appendChild(rem);' +
                         'document.getElementById(\'tokens\')' +
                                                  '.appendChild(newtoken);' +
                        '}' +
                       '}return false;';

               var set_tags = $('#set_tags');
               addHeight = $('<div style="text-align:left">' +
                                 '<a class="reblog_tags" style="color:#666;' +
                                 'font-size:10px;" href="#" ' +
                                 'onclick="' + func + '">' +
                                 MissingE.escapeHTML(MissingE.getLocale(lang)
                                                      .reblogTags) +
                                 '</a></div>')
                  .prependTo(set_tags).outerHeight();
               label = $('#post_tags_label');
               if (label.length > 0) {
                  var newHeight = parseInt(label.css('top').match(/\d*/)[0],
                                           10);
                  if (!isNaN(newHeight)) {
                     newHeight += addHeight;
                     label.css('top',newHeight+'px');
                  }
               }
            }
            $('head').append('<script type="text/javascript">' +
                             'function MissingE_reblogTags(tagReblog) { ' +
                             func + ' }</script>');
            if (settings.passTags === 0 || settings.autoFillTags === 0) {
               $('#post_tags').val("");
               $('#tokens').empty();
               if (settings.tagReblogs === 1) {
                  $.globalEval('MissingE_reblogTags(true);');
               }
            }
            else {
               $.globalEval('MissingE_reblogTags();');
            }
         }
         MissingE.packages.betterReblogsFill.clearReblogTags();
      }
   }