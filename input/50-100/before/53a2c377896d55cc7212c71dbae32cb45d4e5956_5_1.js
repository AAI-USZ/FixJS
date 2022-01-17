function test_all_replied() {
  //add a message in-reply-to the gTestMessage
  let aReply = create_message({
    subject: "People never reply to this email.",
    to:[["Len", "len@somewhere.com"]],
    toCount: 1,
    inReplyTo: gTestMessage,
  });
  add_message_to_folder(folder, aReply);
  
  //Get the header and make sure it gets indexed
  let aReplyHdr = select_click_row(2);
  wait_for_indexing([aReplyHdr]);
  
  let curMessage = select_click_row(0);
  
  wait_for_query_to_complete();
  
  assertionHelper.assert_allRepliedBox_shown();
}