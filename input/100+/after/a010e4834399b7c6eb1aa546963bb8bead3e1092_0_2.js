function(rates, shipping_address) {
    // Re-enable calculate shipping buttons.
    _enableButtons();
    // Formatting shipping address.
    var readable_address = '';
    if (shipping_address.zip) readable_address += shipping_address.zip + ', ';
    if (shipping_address.province) readable_address += shipping_address.province + ', ';
    readable_address += shipping_address.country;
    // Show estimated shipping.
    jQuery('#estimated-shipping em').html(_formatRate(rates[0].price));
    // Show rates and feedback.
    _render( { rates: rates, address: readable_address, success:true } );
    // Revealing response.
    jQuery('#' + _config.wrapperId + ', #estimated-shipping').fadeIn();
  }