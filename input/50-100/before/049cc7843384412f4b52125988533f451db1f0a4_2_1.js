function() {
      var $count = $('.NB-module-account-feedcount');
      var $site_count = $('.NB-module-account-trainer-site-count');
      var $button = $('.NB-module-account-upgrade');
      var approve_list = this.approve_list;
      
      $count.text(approve_list.length);
      $site_count.text(Inflector.pluralize('site', approve_list.length, true));
      $button.removeClass('NB-modal-submit-green').addClass('NB-modal-submit-close');
      $('.NB-module-account-trainer').removeClass('NB-hidden').hide().slideDown(500);
    }