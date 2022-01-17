function(Response, status_text, jqXHR)
      {
        Main.showMessage(Response.message, 'success');
        // Add payment to DOM
        $('#frm_payments').append(Response.result);
        // Format payment currency input
        DynamicInputs.formatInputsInScope('#frm_payments .payment:last');
        // Show payment
        $('#frm_payments .payment:last').hide().fadeIn('fast');
      }