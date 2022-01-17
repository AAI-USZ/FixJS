function(response) {    
    var template = jQuery('#' + _config.templateId);
    var wrapper = jQuery('#' + _config.wrapperId);      
    if (template.length && wrapper.length) {
      template.tmpl(response).appendTo(wrapper);
      if (typeof Currency !== 'undefined' && typeof Currency.convertAll === 'function') {
        var newCurrency = '';
        if (jQuery('[name=currencies]').size()) {
          newCurrency = jQuery('[name=currencies]').val();
        }
        else if (jQuery('#currencies span.selected').size()) {
          newCurrency = jQuery('#currencies span.selected').attr('data-currency');
        }
        if (newCurrency !== '') {
          Currency.convertAll(shopCurrency, newCurrency, '#wrapper-response span.money, #estimated-shipping em span.money');
        }
      }
    }
  }