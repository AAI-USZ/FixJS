function(e)
{
  // Inicializar el motor de inputs dinamicos
  DynamicInputs.initialize();

  // Cargar todos los montos totales
  AccountsGUI.loadTotalAmounts();

  // Cargar todas las cuentas
  AccountsGUI.loadAccounts();

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
}