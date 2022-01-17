function() {
    if (typeof store != 'undefined') {
        store.remove('transactions');
        store.remove('cart');
        flex.payment._regenerate();
        flex.payment.cartData = [];
        return true;
    } else {
        return { error: { code: 401, message: "First run 'flex.payment.init'." } }
    }
}