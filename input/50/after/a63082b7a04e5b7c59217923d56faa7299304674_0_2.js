function(){
    scrollLock({
      protocol: $(this).attr('data-protocol')
    }, $(this).closest('.js-ui-tab-view').attr('data-name'));
  }