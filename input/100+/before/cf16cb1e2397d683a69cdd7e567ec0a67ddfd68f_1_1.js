function _conclude ($this) {
	    var settings = $this.data('saleSettings');
	    var data = {
	        id: settings.data.sale.id,
	        payMethod: $this.find('#payMethod button.active').data('method'),
	        discount: $this.find('.discounts input:checked').data('type'),
	        articles: {}
	    };
	    $this.find('.articles tr:not(.inactive)').each(function () {
	    	data.articles[$(this).data('info').id] = $(this).data('info').currentNumber;
	    });
	    
	    $.webSocket('send', {name: settings.socketName, text: 'action: concludeSelling ' + JSON.stringify(data)});
	    _close($this);
	}