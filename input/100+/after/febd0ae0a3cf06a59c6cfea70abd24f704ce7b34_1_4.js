function(page_number, from_page) {
      if (page_number == null) {
        return this.page_number;
      }
      var page_count = $('.NB-page', this.$modal).length;
      this.page_number = page_number;
      NEWSBLUR.assets.preference('intro_page', page_number);
      
      if (page_number == page_count) {
        $('.NB-tutorial-next-page-text', this.$modal).text('All Done ');
      } else if (page_number > page_count) {
          NEWSBLUR.assets.preference('has_setup_feeds', true);
          NEWSBLUR.reader.check_hide_getting_started();
          this.close(function() {
              NEWSBLUR.reader.open_dialog_after_feeds_loaded();
          });
          return;
      } else if (page_number == 1) {
        $('.NB-tutorial-next-page-text', this.$modal).text("Let's Get Started ");
      } else {
        $('.NB-tutorial-next-page-text', this.$modal).text('Skip this step ');
      }
      $('.NB-page', this.$modal).css({'display': 'none'});
      $('.NB-page-'+this.page_number, this.$modal).css({'display': 'block'});
      $('.NB-modal-page', this.$modal).html($.make('div', [
        'Step ',
        $.make('b', this.page_number),
        ' of ',
        $.make('b', page_count)
      ]));
      if (page_number > 1) {
          $('.NB-intro-spinning-logo', this.$modal).css({'top': 0, 'left': 0, 'width': 48, 'height': 48});
          $('.NB-modal-title', this.$modal).css({'paddingLeft': 42});
      }
      
      if (page_number == 2) {
          this.advance_import_carousel();
      }
      if (page_number == 3) {
          this.make_find_friends_and_services();
      }
      if (page_number == 4) {
          this.show_twitter_follow_buttons();
      }
      
      _gaq.push(['_trackEvent', 'reader_intro', 'Page ' + this.page_number]);
    }