function () {
      var $body = $('body');
      if(attributes.bodyHeight != $body.height()) {
        attributes.bodyHeight = $body.height();
        $(window).trigger('resize');
      }
    }