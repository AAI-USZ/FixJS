function _updatePrices ($this) {
	    var type = $this.find('.discounts input:checked').data('type');
	    $this.find('.articles tr').each(function () {
	        var data = $(this).data('info');
            price = data.discounts[type] !== undefined ? data.discounts[type] : data.price;
	        $(this).find('.price').html('&euro; ' + (price / 100).toFixed(2));
	        $(this).data('info').currentPrice = price;
	    });
	    _updateTotalPrice($this);
	}