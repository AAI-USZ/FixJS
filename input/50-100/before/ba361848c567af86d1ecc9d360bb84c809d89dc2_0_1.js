function(newPrice, oldPrice) {
        var price = this.down('#price');

        if (oldPrice) {
            price.setHtml('');
        }

        if (newPrice) {
            price.setHtml('Price: ' + 
                          newPrice + ' ' + 
                          Cs.Cart.getCurrency());
        }
    }