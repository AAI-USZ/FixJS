function () {
        if (typeof cartId == 'undefined') {
            cartId = date.getTime()+'_'+Math.floor(Math.random()*101);
        }

        if (typeof store.get('cart') != 'undefined') {
            flex.payment.cartData = store.get('cart');
        } else {
            flex.payment.transactions.cartId = cartId;
            store.set('transactions', flex.payment.transactions);
        }

        store.set('cart', flex.payment.cartData);
        if (typeof callback != 'undefined') {
            callback(flex.payment.cartData);
        }
    }