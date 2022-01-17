function(elementId, buttonValue, callback) {
    var container   = document.getElementById(elementId);

    if (flex.payment.paypal.init() != true ) {
        return flex.payment.paypal.init();
    }

    if (container == null) {
        return { error: { code: 404, message: "Element "+elementId+" dont exist." } }
    }

    existingForm = document.getElementById('flex-payment-paypal');
    if (existingForm != null ) {
        container.removeChild(existingForm);
    }

    if (flex.payment.cartData.length == 0) {
        return { error: { code: 401, message: "Cart doesn't have any items" } }
    }

    if (typeof buttonValue == 'undefined') {
        buttonValue = 'Pay with Paypal';
    }

    var form        = document.createElement("form");
        form.setAttribute('action', 'https://www.paypal.com/cgi-bin/webscr');
        form.setAttribute('method', 'post');
        form.setAttribute('id', 'flex-payment-paypal');

    var cart        = document.createElement("input"); 
        cart.setAttribute('hidden', true); 
        cart.setAttribute('name', 'cmd');
        cart.setAttribute('value', '_cart');

    var custom      = document.createElement("input");
        custom.setAttribute('hidden', true);
        custom.setAttribute('name', 'custom');
        custom.setAttribute('value', store.get('transactions').cartId+'___'+flex.appData.app_id);
        custom.setAttribute('id', 'flex-payment-paypal-custom');

    var upload      = document.createElement("input");
        upload.setAttribute('hidden', true);
        upload.setAttribute('name', 'upload');
        upload.setAttribute('value', 1);

    var currency      = document.createElement("input");
        currency.setAttribute('hidden', true);
        currency.setAttribute('name', 'currency_code');
        currency.setAttribute('value', flex.settings.payment.paypal.currency);

    var notify_url      = document.createElement("input");
        notify_url.setAttribute('hidden', true);
        notify_url.setAttribute('name', 'notify_url');
        notify_url.setAttribute('value', 'http://flexpi.com/api/payment/paypal/ipn');
        notify_url.setAttribute('id', 'flex-payment-paypal-notify-url');

    var business      = document.createElement("input");
        business.setAttribute('hidden', true);
        business.setAttribute('name', 'business');
        business.setAttribute('value', flex.settings.payment.paypal.email);
        

    form.appendChild(cart);
    form.appendChild(custom);
    form.appendChild(upload);
    form.appendChild(currency);
    form.appendChild(notify_url);
    form.appendChild(business);

    var item_name,
        amount,
        quantity;

    for (i=0; i < flex.payment.cartData.length; i++) {
        item_name      = document.createElement("input");
        item_name.setAttribute('hidden', true);
        item_name.setAttribute('name', 'item_name_'+(i+1));
        item_name.setAttribute('value', flex.payment.cartData[i].item_name);

        amount      = document.createElement("input");
        amount.setAttribute('hidden', true);
        amount.setAttribute('name', 'amount_'+(i+1));
        amount.setAttribute('value', flex.payment.cartData[i].amount.toFixed(2));

        quantity      = document.createElement("input");
        quantity.setAttribute('hidden', true);
        quantity.setAttribute('name', 'quantity_'+(i+1));
        quantity.setAttribute('value', parseInt(flex.payment.cartData[i].quantity, 10));

        form.appendChild(item_name);
        form.appendChild(amount);
        form.appendChild(quantity);
    }

    var submit      = document.createElement("input");
        submit.setAttribute('type', 'submit');
        submit.setAttribute('class', 'flex-payment-paypal-send');
        submit.setAttribute('value', buttonValue);

    form.appendChild(submit);

    container.appendChild(form);

    if (typeof callback != 'undefined') {
        callback();
    }
}