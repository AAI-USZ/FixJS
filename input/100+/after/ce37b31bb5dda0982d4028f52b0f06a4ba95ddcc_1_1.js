function(payment_id, Button)
  {
    var $Btn = $(Button);
    Quark.ajax('home/ajax-delete-payment', {
      data: {
        'payment_id': payment_id
      },
      beforeSend: function(jqXHR, Settings)
      {
        $Btn.attr('disabled', 'disabled');
      },
      complete: function(jqXHR, text_status)
      {
        $Btn.removeAttr('disabled');
      },
      success: function(Response, status_text, jqXHR)
      {
        Main.showMessage(Response.message, 'success');
        // Remove payment from DOM in a fancy way :)
        $('#payment_' + payment_id).animate({'width': '0px'}, 250, function()
        {
          $(this).remove();
        });
        // Refresh total amounts
        AccountsGUI.loadTotalAmounts();
      }
    });
  }