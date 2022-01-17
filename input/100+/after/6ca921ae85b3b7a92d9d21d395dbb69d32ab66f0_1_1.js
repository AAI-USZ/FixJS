function issuesPage(){ 
  initIssuesSearch();
  $("#label_name").chosen();
  $("#assignee_id").chosen();
  $("#milestone_id").chosen();
  $("#milestone_id, #assignee_id, #label_name").on("change", function(){
    $(this).closest("form").submit();
  });

  $('body').on('ajax:success', '.close_issue, .reopen_issue, #new_issue', function(){
    var t = $(this),
        totalIssues,
        reopen = t.hasClass('reopen_issue'),
        newIssue = false;
    if( this.id == 'new_issue' ){
      newIssue = true;
    }
    $('.issue_counter, #new_issue').each(function(){
      var issue = $(this);
      totalIssues = parseInt( $(this).html(), 10 );

      if( newIssue || ( reopen && issue.closest('.main_menu').length ) ){
        $(this).html( totalIssues+1 );
      }else {
        $(this).html( totalIssues-1 );
      }
    });

  });
}