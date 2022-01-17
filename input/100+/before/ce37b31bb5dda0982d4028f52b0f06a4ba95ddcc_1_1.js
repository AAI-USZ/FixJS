function(account_id)
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
  }