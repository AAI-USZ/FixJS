function(ev) {
        var $tab;
        ev.preventDefault();
        $tab = jQuery(this);
        $metabox.find('.wp-tab-bar li').removeClass('wp-tab-active');
        $tab.addClass('wp-tab-active');
        return $metabox.find('.tabs-panel').hide().end().find($tab.data('ref')).show().find(':text').focus();
      }