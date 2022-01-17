function(newPrice, oldPrice) {
        var price = this.down('#price');

        if (Ext.isDefined(oldPrice)) {
            price.setHtml('');
        }

        if (Ext.isDefined(newPrice)) {
            price.setHtml('Price: ' + 
                          newPrice + ' ' + 
                          Cs.Cart.getCurrency());
        }
    }