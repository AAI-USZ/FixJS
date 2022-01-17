function(item) {
      if (item.tagName === 'LI' && $(item).hasClass('post')) {
         var lang = $('html').attr('lang');
         var post = $(item).attr('id').match(/\d*$/)[0];
         if (MissingE.isTumblrURL(location.href, ["tagged"]) &&
             ($('#user_menu_' + post + ' a[following]')
                   .attr('following') === 'false' ||
              $('#user_menu_' + post).length === 0)) {
            return false;
         }
         var ctrl = $(item).find('div.post_controls:not(.bookmarkAdded)');
         var j;
         var marks = MissingE.packages.bookmarker
            .parseMarks(MissingE.getStorage("MissingE_bookmarker_marks",""));
         var heart = ctrl.find('a.like_button');
         var mag = ctrl.find('a.MissingE_magnify');
         var klass = 'post_control MissingE_mark';
         var from = this.dashboardPagePost ? this.dashboardPagePost : 0;
         for (j=0; j < marks.length; j++) {
            if (post === marks[j][1]) {
               klass += ' MissingE_ismarked';
               MissingE.packages.bookmarker.addBar(marks[j], lang);
               break;
            }
            var postVal = parseInt(post,10);
            var markVal = parseInt(marks[j][1],10);
            var prevPost = $(item).prevAll('li.post:not(#new_post)').first();
            if (MissingE.isTumblrURL(location.href, ["dashboardOnly"]) &&
                postVal < markVal &&
                ((prevPost.length === 1 &&
                  parseInt(prevPost.attr('id').match(/\d*$/)[0],10) > markVal) ||
                 from > markVal)) {
               MissingE.packages.bookmarker.addBar(marks[j], lang, item);
            }
         }
         var node = $('<a />', {"class": klass, id: "bookmark_" + post,
                                title: MissingE.getLocale(lang).bookmarkVerb,
                                href: "#", click: function(){ return false}});
         node.click(MissingE.packages.bookmarker.markClick);
         ctrl.addClass('bookmarkAdded');
         if (mag.length > 0) {
            mag.after(node);
         }
         else if (heart.length > 0) {
            heart.before(node);
         }
         else {
            ctrl.append(node);
         }
      }
   }