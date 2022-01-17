function test_expect_reply_past_deadline() {
  // set the expect reply date to some day prior to today's date.
  plan_for_modal_dialog("replyManagerDateDialog", function(ac){
    let curDialog = ac.window.document.getElementById("replyManagerDateDialog");
    let acceptButton = new elib.Elem(curDialog.getButton("accept"));
    let datePicker = ac.window.document.getElementById("replyManagerDatePicker");
    datePicker.value = "2011-01-01";
    ac.click(acceptButton);
  });
  mc.click(assertionHelper.otherActionsButton);
  mc.click(assertionHelper.modifyExpectReplyItem);
  wait_for_modal_dialog("replyManagerDateDialog");
  
  wait_for_query_to_complete();
  
  assertionHelper.assert_past_deadline_not_all_replied();
}