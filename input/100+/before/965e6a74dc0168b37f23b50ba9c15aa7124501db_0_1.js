function(item, tagAsker, defTags, betterAnswers) {
      var i;
      if (item.tagName !== 'LI' || !$(item).hasClass('post')) {
         return false;
      }
      var answer = $(item).find('form[action="#"]');
      if (answer.length === 0) {
         return false;
      }
      var lang = $('html').attr("lang");
      var id = $(item).attr('id').match(/\d*$/)[0];

      if (betterAnswers === 1) {
         var allbtns = [];
         var suffix;
         for (i in MissingE.getLocale(lang).postingTweaks.submitText) {
            if (MissingE.getLocale(lang).postingTweaks.submitText
                  .hasOwnProperty(i)) {
               var newbtn;
               if (i === 'publish') { continue; }
               if (i === 'queue' || i === 'draft') {
                  suffix = 'also_';
               }
               else {
                  suffix = '';
               }
               newbtn = $('<button />',
                          {"class": "chrome",
                           id: "ask_" + i + "_button_" + suffix + id,
                           click: function(){ return false; }})
                           .append($('<div />',
                                     {"class": "chrome_button",
                                      text: MissingE.getLocale(lang)
                                             .postingTweaks.submitText[i]})
                              .prepend($('<div />',
                                         {"class": "chrome_button_left"}))
                              .append($('<div />',
                                        {"class": "chrome_button_right"})));
               allbtns.push(newbtn);
               allbtns.push($('<br />'));
            }
         }
         var btn = $('#ask_publish_button_' + id);
         var postbtn = $('<button />',
                         {"class": "chrome blue",
                          id: "ask_publish_button_also_" + id,
                          name: "publish",
                          type: "submit",
                          click: function() { return false; }})
                          .append($('<div />',
                                    {"class": "chrome_button",
                                     text: btn.text()})
                                    .prepend($('<div />',
                                               {"class": "chrome_button_left"}))
                                    .append($('<div />',
                                              {"class": "chrome_button_right"})));
         btn.after(postbtn);

         if (allbtns.length >= 2) {
            allbtns.splice(allbtns.length-1,1);
         }
         var postMenu = $('<div class="MissingE_postMenu" />');
         for (i=0; i<allbtns.length; i++) {
            postMenu.append(allbtns[i]);
         }
         postMenu.insertAfter(postbtn);
         btn.hide();
         $('#ask_publish_button_also_' + id).click(function() {
            MissingE.packages.askTweaks.doManualAnswering(id, 'publish');
         });
         $('#ask_queue_button_also_' + id).click(function() {
            MissingE.packages.askTweaks.doManualAnswering(id, 'queue');
         });
         $('#ask_draft_button_also_' + id).click(function() {
            MissingE.packages.askTweaks.doManualAnswering(id, 'draft');
         });
         $('#ask_private_button_' + id).click(function() {
            MissingE.packages.askTweaks.doManualAnswering(id, 'private');
         });

         var x;
         var asker = $(item).find('div.post_info').html();
         asker = asker.replace(/<br[^>]*>/g,'')
               .replace(/<span[^>]*MissingE_timestamp[^>]*>[^<]*<[^>]*>/g,'');
         asker = asker.replace(/<[^>]*>/g,'');
         asker = asker.match(/[0-9A-Za-z\-\_]+/);
         if (!asker || asker.length === 0) {
            asker = null;
         }
         else {
            asker = MissingE.escapeHTML(asker[0]);
         }
         if (/anonymous_avatar/.test($(item).find('div.avatar_and_i').html())) {
            asker = MissingE.escapeHTML(MissingE.getLocale(lang).anonymous);
         }
         if (tagAsker === 1 && asker && asker !== "") {
            startTags = [asker];
         }
         else {
            startTags = [];
         }
         if (defTags !== '') {
            for (x=0; x<defTags.length; x++) {
               startTags.push(defTags[x]);
            }
         }
         if (startTags.length > 0) {
            startTags = startTags.join(', ');
         }
         else {
            startTags = '';
         }
         var adding = $('<div />', {"class": "MissingE_askTweaks_group"})
                        .append($('<div />',
                                  {text: MissingE.getLocale(lang).tagsText +
                                         ": "})
                                 .append($('<input />',
                                           {type: "text",
                                            "class": "MissingE_askTweaks_tags",
                                            val: startTags})))
                        .append($('<div />',
                                  {text: MissingE.getLocale(lang).twitterText +
                                          ": "})
                                 .append($('<input />',
                                           {type: "checkbox",
                                            "class": "MissingE_askTweaks_twitter"})));
         answer.find('div:first').css('padding-top','10px')
            .addClass('MissingE_askTweaks_buttons').before(adding);
         $(item).find('input.MissingE_askTweaks_tags').keydown(function(e) {
            if (e.which === 74 || e.which === 75 ||
                e.which === 37 || e.which === 39) {
               e.stopPropagation();
            }
         });
      }
   }