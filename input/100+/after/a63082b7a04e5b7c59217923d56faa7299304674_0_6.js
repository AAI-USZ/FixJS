function scrollLock(options, port) {
    var portName = port || options.protocol
      , selector = '.js-ui-tab-view[data-name="'+portName+'"]'
      ;
    if($(selector +' .js-scroll.js-'+options.protocol).attr('checked')){
      $(selector + ' .js-'+options.protocol+'-stream')[0].scrollTop = $(selector +' .js-'+options.protocol+'-stream')[0].scrollHeight;
    }
    if($(selector +' .js-'+options.protocol+'-stream')[0].scrollHeight > 6000){
      console.log('cleared space: '+portName);
      $(selector +' .js-'+options.protocol+'-stream span').first().remove();
      $(selector +' .js-'+options.protocol+'-stream span').first().remove();
    }
  }