function () 

  {

    let beforeExpectReplyDateLabel = document.getElementById("BeforeExpectReplyDateLabel");

    let expectReplyDateLabel = document.getElementById("ExpectReplyDateLabel");

	expectReplyDateLabel.textContent = "";

    let expectReplyCheckbox = document.getElementById("hdrViewExpectReplyCheckbox");

    let modifyCommand = document.getElementById("cmd_hdrViewModifyExpectReply");

    let msgHdr = gFolderDisplay.selectedMessage;

    if (msgHdr.isExpectReply) {

      expectReplyCheckbox.setAttribute("checked", "true");

      modifyCommand.setAttribute("disabled", "false");

      beforeExpectReplyDateLabel.collapsed = false;

      expectReplyDateLabel.textContent += msgHdr.getStringProperty("ExpectReplyDate");

      expectReplyDateLabel.collapsed = false;

    } else {

      expectReplyCheckbox.setAttribute("checked", "false");

      modifyCommand.setAttribute("disabled", "true");

      beforeExpectReplyDateLabel.collapsed = true;

      expectReplyDateLabel.collapsed = true;

    }

  }