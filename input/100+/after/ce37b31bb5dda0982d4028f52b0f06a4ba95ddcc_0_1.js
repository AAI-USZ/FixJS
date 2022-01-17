function(e)
{
  // Inicializar el motor de inputs dinamicos
  DynamicInputs.initialize();

  // Cargar todos los montos totales
  AccountsGUI.loadTotalAmounts();

  // Cargar todas las cuentas
  AccountsGUI.loadAccounts();
  
  // Format dynamic inputs for payments
  DynamicInputs.formatInputsInScope('#frm_payments');

  // Botón para agregar cuenta
  $('#btn_add_account').on('click', function(e)
  {
    e.preventDefault();
    AccountsGUI.addAccount(this);
  });
  
  // Add payment button
  $('#btn_add_payment').on('click', function(e)
  {
    e.preventDefault();
    AccountsGUI.addPayment(this);
  });
  
  // Show/hide payment delete button
  $('.payment').live('mouseenter', function(e)
  {
    $(this).find('.btn.btn-danger').show();
  }).live('mouseleave', function(e)
  {
    $(this).find('.btn.btn-danger').hide();
  });
  
  // Delete payment
  $('.payment .btn.btn-danger').live('click', function(e)
  {
    AccountsGUI.deletePayment($(this).data('target-id'), this);
  });

  // Asignar funcionalidad a los botones "type" y "delete" de los movimientos
  $('.movement_btn_type').live('click', function(e)
  {
    e.preventDefault();
    AccountsGUI.changeMovementType($(this).data('target')
      , $(this).data('type') == 1 ? 0 : 1, this);
  });

  $('.movement_btn_delete').live('click', function(e)
  {
    e.preventDefault();
    AccountsGUI.deleteMovement($(this).data('target'), this);
  });

  // Boton "agregar movimiento"
  $('.account_btn_add_movement').live('click', function(e)
  {
    e.preventDefault();
    AccountsGUI.addMovement($(this).data('target'));
  });

  // Boton "borrar cuenta"
  $('.account_btn_trigger_delete').live('click', function(e)
  {
    e.preventDefault();
    AccountsGUI.deleteAccount( $(this).data('target') );
  });
}