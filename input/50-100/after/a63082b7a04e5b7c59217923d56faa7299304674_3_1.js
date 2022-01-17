function stateChange(protocol, port){
    if(protocol === 'all'){
      $('.js-ui-tab-view.js-all').addClass('css-inactive');
      $('.js-ui-tab-view.js-all').removeClass('css-active');
    }
    else{
      $('.js-ui-tab-view[data-name="'+protocol+'"]').toggleClass('css-active');
      $('.js-ui-tab-view[data-name="'+protocol+'"]').toggleClass('css-inactive');
      $('.js-ui-tab-view[data-name="'+port+'"]').toggleClass('css-active');
      $('.js-ui-tab-view[data-name="'+port+'"]').toggleClass('css-inactive');
    }
  }