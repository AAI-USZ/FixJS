function(Response, status_text, jqXHR)
      {
        // Remove account from DOM
        $('#account_' + account_id).fadeOut('fast', function()
        {
          $(this).remove();
        });
        // Show message
        Main.showMessage(Response.message, 'success');
        // Refresh total amounts in GUI
        AccountsGUI.loadTotalAmounts();
      }