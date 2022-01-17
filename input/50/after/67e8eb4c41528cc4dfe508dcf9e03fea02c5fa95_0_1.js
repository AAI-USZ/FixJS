function() {
                    processComments();
                    createDraftComment();

                    gCommentDlg
                        .setDraftComment(draftComment)
                        .setCommentsList(comments, "file_attachment_comments")
                        .positionToSide(addCommentButton, {
                            side: 'b',
                            fitOnScreen: true
                        });
                    gCommentDlg.open();
                }