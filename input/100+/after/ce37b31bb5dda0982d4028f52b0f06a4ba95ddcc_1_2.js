function()
{
  this.deletePayment = function(payment_id, Button)
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
  };
  
  /**
   * Send request to add a new payment and insert the new payment in DOM
   * @param [HTMLButtonElement] HTMLButtonElement Clicked button to add payment.
   */
  this.addPayment = function(HTMLButtonElement)
  {
    var $Btn = $(HTMLButtonElement);
    Quark.ajax('home/ajax-add-payment', {
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
        // Add payment to DOM
        $('#frm_payments').append(Response.result);
        // Format payment currency input
        DynamicInputs.formatInputsInScope('#frm_payments .payment:last');
        // Show payment
        $('#frm_payments .payment:last').hide().fadeIn('fast');
      }
    });
  };
  
  /**
   * Envia la solicitud para agregar una nueva cuenta al perfil del usuario actual.
   * @param {HTMLButtonElement} HTMLButtonElement Botón presionado, opcional
   */
  this.addAccount = function(HTMLButtonElement)
  {
    var $Btn = $(HTMLButtonElement);
    Quark.ajax('home/ajax-add-account', {
      beforeSend: function()
      {
        $Btn.attr('disabled', 'disabled');
      },
      complete: function()
      {
        $Btn.removeAttr('disabled');
      },
      success: function(Response)
      {
        $('#accounts').append(Response.result);
        $('#accounts .account:last').hide().fadeIn('fast');
        Main.showMessage(Response.message, 'success');
      }
    });
  };

  /**
   * Envia la solicitud para eliminar una cuenta y todos sus movimientos
   * @param Number account_id ID de la cuenta a borrar
   */
  this.deleteAccount = function(account_id)
  {
    var $BtnDropdown = $('#btn_delete_account_' + account_id);
    Quark.ajax('home/ajax-delete-account', {
      data: {'account_id': account_id},
      beforeSend: function(jqXHR, Settings)
      {
        $BtnDropdown.attr('disabled', 'disabled');
      },
      complete: function(jqXHR, text_status)
      {
        $BtnDropdown.removeAttr('disabled');
      },
      success: function(Response, status_text, jqXHR)
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
    });
  };

  /**
   * Agrega un nuevo movimiento a la cuenta con el ID account_id
   * @param Number account_id
   */
  this.addMovement = function(account_id)
  {
    Quark.ajax('home/ajax-add-movement',{
      data: {'account_id': account_id},
      success: function(data)
      {
        $Movement = $(data.result);
        $Movement.hide();
        $('.movements_list', '#account_' + account_id).prepend($Movement);
        $Movement.slideDown('fast');
        // Formatear los dynamic inputs del nuevo movimiento
        DynamicInputs.formatInputsInScope($Movement);
      }
    });
  };

  /**
   * Envia la solicitud para borrar un movimiento
   * 
   * @param Number movement_id
   * @param String HTMLButtonElement
   */
  this.deleteMovement = function(movement_id, HTMLButtonElement)
  {
    var $Btn = $(HTMLButtonElement);
    Quark.ajax('home/ajax-delete-movement',{
      data: {'id':movement_id},
      beforeSend: function()
      {
        $Btn.attr('disabled', 'disabled');
      },
      complete: function()
      {
        $Btn.removeAttr('disabled');
      },
      success: function()
      {
        // Recargar las cuentas totales
        AccountsGUI.loadTotalAmounts();

        // Borrar el elemento del movimiento
        $('#movement_' + movement_id).slideUp('fast', function()
        {
          $(this).remove();
        });
      }
    })
  };

  /**
   * Envia la solicitud para modificar el tipo de un movimiento.
   * 
   * @param  Number movement_id       ID del movimiento
   * @param  Number new_type          1 Ingreso, 0 Egreso
   * @param  HTMLButtonElement        HTMLButtonElement Boton presionado
   */
  this.changeMovementType = function(movement_id, new_type, HTMLButtonElement)
  {
    var $Btn = $(HTMLButtonElement);

    Quark.ajax('home/ajax-change-movement-type',{
      data: {'id': movement_id, 'new_type': new_type},
      beforeSend: function()
      {
        $Btn.attr('disabled', 'disabled');
      },
      complete: function(jqXHR, text_status, data)
      {
        $Btn.removeAttr('disabled');
      },
      success: function(data, text_status, jqXHR)
      {
        $Btn.data('type', new_type);

        // Actualizar el aspecto del boton
        if(new_type == 1){
          $Btn.removeClass('btn-warning').addClass('btn-success');
          $('i', HTMLButtonElement).removeClass('icon-minus-sign')
            .addClass('icon-plus-sign');
        } else {
          $Btn.removeClass('btn-success').addClass('btn-warning');
          $('i', HTMLButtonElement).removeClass('icon-plus-sign')
            .addClass('icon-minus-sign');
        }

        AccountsGUI.loadTotalAmounts();
      }
    });
  };

  this.loadAccounts = function()
  {
    Quark.ajax('home/ajax-load-accounts',{
      success: function(Response)
      {
        for(var i in Response.result){
          $('#accounts').prepend(Response.result[i]);
        }
        DynamicInputs.formatInputsInScope('#accounts');
      }
    });
  };

  /**
   * Carga los montos totales de capital, gastos y disponible
   */
  this.loadTotalAmounts = function()
  {
    Quark.ajax('home/ajax-load-total-amounts',{
      success: function(Response)
      {
        $('#amount_entire').text(
          DynamicInputs.toCurrency(Response.result.amount_entire));
        $('#amount_payments').text(
          DynamicInputs.toCurrency(Response.result.amount_payments));
        $('#amount_available').text(
          DynamicInputs.toCurrency(Response.result.amount_available));
      }
    });
  };

}