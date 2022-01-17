function(Response, status_text, jqXHR)
      {
        // Main.showMessage(Response.message, 'success');
        // Remove payment from DOM in a fancy way :)
        $('#payment_' + payment_id).animate({'width': '0px'}, 250, function()
        {
          $(this).remove();
        });
        // Refresh total amounts
        AccountsGUI.loadTotalAmounts();
      }