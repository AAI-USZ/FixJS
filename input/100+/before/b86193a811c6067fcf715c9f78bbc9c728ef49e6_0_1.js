function(options){
    var that = this;
    var url = this.ol.data('url');
    if(!url){ return; }
    var filters = _.map(
      $.extend({offset: 0, recent_first: true}, this.ol.data('options'), options),
      function(val, key){ return key + '=' + val; }
    ).join('&');
    this.disablePagination = true;

    url += ((url.indexOf("?") >= 0) ? '&' : '?') + filters;
    $.get(url, null, null, 'html')
    .success(function(html){
      if($.trim(html) != ''){
        var items = $(html).hide();

        that.ol.append(items);
        items.fadeIn('slow');
        that.disablePagination = false;
      }
    });
  }