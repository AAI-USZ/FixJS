function() {
    $(this).button();
    $(this).attr("checked", 'unchecked');
    $(this).button('refresh');
  }