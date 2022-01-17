function issuesPage(){ 
  initIssuesSearch();
  $("#label_name").chosen();
  $("#assignee_id").chosen();
  $("#milestone_id").chosen();
  $("#milestone_id, #assignee_id, #label_name").on("change", function(){
    $(this).closest("form").submit();
  });
}