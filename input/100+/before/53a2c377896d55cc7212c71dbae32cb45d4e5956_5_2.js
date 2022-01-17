function test_expect_reply_within_deadline() {
  be_in_folder(folder);
  let curMessage = select_click_row(0);
  wait_for_indexing([curMessage]);
  
  /* set isExpectReply to true and the expect reply date to
   * today's date. */
  plan_for_modal_dialog("replyManagerDateDialog", function(ac){
    let curDialog = ac.window.document.getElementById("replyManagerDateDialog");
    let acceptButton = new elib.Elem(curDialog.getButton("accept"));
    ac.click(acceptButton);
  });
  mc.click(assertionHelper.otherActionsButton);
  mc.click(assertionHelper.toggleExpectReply);
  wait_for_modal_dialog("replyManagerDateDialog");
  
  wait_for_query_to_complete();
  
  //The expect reply date is today and not all replied
  assertionHelper.assert_within_deadline_not_all_replied();
}