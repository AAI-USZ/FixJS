function() {
    var assoc = $(this).attr('data-association');
    var resources = $("#"+assoc+"_attributes__destroy[value='false']").filter(function(){
        return $(this).closest('.nested_form_blueprint').length == 0;
    });
    if (resources.length) {
      $(this).hide();
    }
  }