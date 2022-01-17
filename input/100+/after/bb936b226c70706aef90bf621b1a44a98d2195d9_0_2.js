function(redirect) {
    var $assignment = $("#full_assignment");
    var $form = $("#edit_assignment_form");
    $form.hide();
    if(wikiSidebar) {
      wikiSidebar.hide();
      $("#sidebar_content").show();
    }
    $assignment.find(".description").show();
    $assignment.find(".edit_full_assignment_link").show();
  }