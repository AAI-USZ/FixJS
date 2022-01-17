function(event) {

    // Wipes existing options TODO: hide, instead of remove?

    if (!initEditing){
      $(this).parents(".nested-fields").find(".option-field").remove();
    }
    $(this).parents(".question-entry").removeClass("has-followup");

    var value = $(this).val();

    var parent_container_entry = $(this).parents(".question-entry");
    parent_container_entry.find(".add-option-button").hide();	


    if (value == "YN") {
      
      if (!initEditing){
        // Clicks the add_option button twice
        parent_container_entry.find(".add-option-button").click();
        parent_container_entry.find(".add-option-button").click();	
      }
      // Pre-fills out information, sets class to disabled
      parent_container_entry.find(".option-field .option-text").first().addClass("disabled yes-no").val("Yes");
      parent_container_entry.find(".option-field .option-value").first().addClass("disabled yes-no").val("yes");
      parent_container_entry.find(".option-field .option-text").last().addClass("disabled yes-no").val("No");
      parent_container_entry.find(".option-field .option-value").last().addClass("disabled yes-no").val("no");

      // Removes "remove option" button
      parent_container_entry.find(".help-inline a.remove_fields").remove();
    }
    else if (value == "MULTI") {
      // Show "add option" button
      parent_container_entry.find(".add-option-button").show();

      if (!initEditing){
        // Clicks the add_option button twice 
        parent_container_entry.find(".add-option-button").click();
        parent_container_entry.find(".add-option-button").click();
      }
    }
    else if (value == "OPEN") {
    }
  }