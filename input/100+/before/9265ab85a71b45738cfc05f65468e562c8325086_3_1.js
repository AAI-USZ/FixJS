function(item) {
      if (item.tagName === "LI" && $(item).hasClass("post") &&
          $(item).hasClass("photo")) {
         var lang = $('html').attr('lang');
         var ctrl = $(item).find('div.post_controls');
         if (ctrl.find('.MissingE_magnify').length > 0) {
            return;
         }
         var bm = ctrl.find('a.MissingE_mark');
         var heart = ctrl.find('a.like_button');
         var publish;
         var count = 1;
         var caps;
         var tid = $(item).attr("id").match(/\d*$/)[0];
         var str, img, imgnum;
         var set = $('#photoset_' + tid);
         var revisions = [];

         if (MissingE.isTumblrURL(location.href, ["drafts", "queue"])) {
            publish = ctrl.find('a').filter(function() {
               return /publish_post_/.test($(this).attr('onclick'));
            }).first();
         }

         if (set.length > 0) {
            var imgs = set.find('img');
            count = imgs.length;
            caps = [];
            imgs.each(function(i) {
               var thecap = $(this).attr('alt');
               imgnum = this.src.match(/(\d+)_(?:r\d+_)?\d+.[a-z]{2,4}$/i);
               if (imgnum && imgnum.length > 1) {
                  revisions.push(imgnum[1]);
               }
               else {
                  revisions.push(i+1);
               }
               if (!thecap) { thecap = ""; }
               caps.push(thecap);
            });
            img = imgs.first();
         }
         else {
            img = $(item).find('div.post_content img:first');
            imgnum = img.attr('src').match(/(\d+)_(?:r\d+_)?\d+.[a-z]{2,4}$/i);
            if (imgnum && imgnum.length > 1) {
               revisions.push(imgnum[1]);
            }
            else {
               revisions.push(i+1);
            }
         }
         if (img.length > 0) {
            str = img.attr("src").match(/\/(tumblr_[^_]*)/);
            if (!str || str.length < 1) {
               str = img.attr("src").match(/media\.tumblr\.com\/([^_]*)/);
            }
            if (str && str.length > 1) {
               str = str[1].substr(0,str[1].length-2);
            }
            else {
               str = null;
            }
         }

         if (str) {
            var mi = $('<a />',
                       {title: MissingE.getLocale(lang).loading,
                        "class": "MissingE_magnify MissingE_magnify_hide",
                        id: "magnify_" + tid, href: "#",
                        click: function() { return false; }});
            mi.click(MissingE.packages.magnifier.magClick);
            if (publish && publish.length > 0) {
               publish.before(mi);
            }
            else if (bm.length > 0) {
               bm.before(mi);
            }
            else if (heart.length > 0) {
               heart.before(mi);
            }
            else {
               ctrl.append(mi);
            }
         }
         extension.sendRequest("magnifier",
                               {pid: tid, code: str, num: count,
                                captions: caps, revs: revisions},
                               MissingE.packages.magnifier.receiveMagnifier);
      }
   }