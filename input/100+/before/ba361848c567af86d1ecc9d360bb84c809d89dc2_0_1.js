function(newQty, oldQty) {
        var qtyEl = this.down('#quantity');

        if (oldQty) {
            qtyEl.setValue(0);
            qtyEl.setId(this.getProduct_id());
            qtyEl.setLabel('');
        }

        if (newQty) {
            var price = this.getPrice();
            
            qtyEl.setValue(newQty);
            qtyEl.setId(this.getProduct_id());
            qtyEl.setLabel('Subtotal: ' + 
                           price * newQty + ' ' +
                           Cs.Cart.getCurrency());
        }
    }