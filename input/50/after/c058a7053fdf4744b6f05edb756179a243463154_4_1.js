function favicon_ok (idx, img) {
    img.onload = function () {
      var c = 'ficon-error';
      $(img).closest('.' + c).removeClass(c).addClass('ficon-ok');
    };
  }