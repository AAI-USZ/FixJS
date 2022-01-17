function() {
        var $tab;
        $tab = jQuery(this);
        $metabox.find('.wp-tab-bar li').removeClass('wp-tab-active');
        $tab.addClass('wp-tab-active');
        $metabox.find('.tabs-panel').hide().end().find($tab.data('ref')).show().find(':text').focus();
        return false;
      }