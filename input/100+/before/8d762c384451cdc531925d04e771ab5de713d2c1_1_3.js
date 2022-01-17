function(e, value) {
                    gEditCount--;

                    self.html(linkifyText(self.text()));

                    if (context_type == "body_top" ||
                        context_type == "body_bottom") {
                        review_reply[context_type] = value;
                        obj = review_reply;
                    } else if (context_type == "comment") {
                        obj = new RB.DiffCommentReply(review_reply, null,
                                                      context_id);
                        obj.setText(value);
                    } else if (context_type == "screenshot_comment") {
                        obj = new RB.ScreenshotCommentReply(review_reply, null,
                                                            context_id);
                        obj.setText(value);
                    } else if (context_type == "file_comment") {
                        obj = new RB.FileAttachmentCommentReply(
                            review_reply, null, context_id);
                        obj.setText(value);
                    } else {
                        /* Shouldn't be reached. */
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