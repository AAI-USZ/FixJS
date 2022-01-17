function(e, value) {
                    gEditCount--;

                    self.html(linkifyText(self.text()));

                    if (context_type == "body_top" ||
                        context_type == "body_bottom") {
                        review_reply[context_type] = value;
                        obj = review_reply;
                    } else if (context_type === "diff_comments") {
                        obj = new RB.DiffCommentReply(review_reply, null,
                                                      context_id);
                        obj.setText(value);
                    } else if (context_type === "screenshot_comments") {
                        obj = new RB.ScreenshotCommentReply(review_reply, null,
                                                            context_id);
                        obj.setText(value);
                    } else if (context_type === "file_attachment_comments") {
                        obj = new RB.FileAttachmentCommentReply(
                            review_reply, null, context_id);
                        obj.setText(value);
                    } else {
                        /* Shouldn't be reached. */
                        console.log("createCommentEditor received unexpected " +
                                    "context type '%s'",
                                    context_type);
                        return;
                    }

                    obj.save({
                        buttons: bannerButtonsEl,
                        success: function() {
                            removeCommentFormIfEmpty(self);
                            showReplyDraftBanner(review_id);
                        }
                    });
                }