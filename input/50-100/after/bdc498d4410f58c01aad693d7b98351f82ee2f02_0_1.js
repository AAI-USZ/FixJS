function(event){
    $(this).parents(".option-field").find(".add-followup-button").click();
    $(this).parents(".question-entry").addClass("has-followup");
    event.preventDefault();
  }