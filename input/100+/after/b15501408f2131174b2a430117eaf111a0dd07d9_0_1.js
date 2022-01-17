function () {
        
        flex.payment._regenerate(cartId);

        if (typeof callback != 'undefined') {
            callback(flex.payment.cartData);
        }
    }