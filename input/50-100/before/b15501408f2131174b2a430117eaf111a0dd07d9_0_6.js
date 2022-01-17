function() {
    if (typeof store != 'undefined') {
         store.remove('transactions');
         store.remove('cart');
         return true;
    } else {
        return { error: { code: 401, message: "First run 'flex.payment.init'." } }
    }
}