function() {
                commentBlock._createDraftComment();
                activeCommentBlock = commentBlock;

                gCommentDlg
                    .setDraftComment(commentBlock.draftComment)
                    .setCommentsList(commentBlock.comments,
                                     "screenshot_comment")
                    .positionToSide(commentBlock.flag, {
                        side: 'b',
                        fitOnScreen: true
                    });
                gCommentDlg.open();
            }