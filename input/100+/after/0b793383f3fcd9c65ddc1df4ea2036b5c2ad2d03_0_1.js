function validate_checkout(){
    flag = false;
    $.each( $(".checkout"), function(i, l){
      var steps = $(this).find(':checkbox').length;
      var steps_completed = $(this).find("input:checked").length;
      var selected = $(this).find(".dropselect").val();
      if (selected != ""){
        if (steps_completed != steps) {
          flag = true;
        } 
        else { // do nothing
        }
      } else {
          if (steps_completed > 0) {
            flag = true;
          }
          else {}
        }
    });
    return flag;
  }