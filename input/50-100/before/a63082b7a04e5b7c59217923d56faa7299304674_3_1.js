function stateChange(options){
    if(options.protocol === 'all'){
      $('.js-ui-tab-view.js-all').addClass('css-inactive');
      $('.js-ui-tab-view.js-all').removeClass('css-active');
    }
    else{
      $('.js-ui-tab-view[data-name="'+options.protocol+'"]').toggleClass('css-active');
      $('.js-ui-tab-view[data-name="'+options.protocol+'"]').toggleClass('css-inactive');
    }
  }