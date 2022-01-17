function(callback, cartId) {
    var scripts = [];
    scripts[0] = '//flexpi.com/api/store.js';

    flex.loader(scripts, function () {
        
        flex.payment._regenerate(cartId);

        if (typeof callback != 'undefined') {
            callback(flex.payment.cartData);
        }
    });
}