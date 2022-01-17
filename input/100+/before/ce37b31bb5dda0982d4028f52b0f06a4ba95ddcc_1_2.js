function()
{
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
   * @param  Number movement_id
   * @param  String HTMLButtonElement
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