function(){
    var select = $('#wrongExternalSelect .changeDataMode');
    ok(select.is(':visible'), 'select should be visible');
    ok(select.find('option').length > 0, 'select should contain items');
  }