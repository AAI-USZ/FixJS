function(event){
    console.log("HellO!");
    $(this).parents(".option-field").find(".add-followup-button").click();
    $(this).parents(".question-entry").addClass("has-follow-up");
    event.preventDefault();
  }