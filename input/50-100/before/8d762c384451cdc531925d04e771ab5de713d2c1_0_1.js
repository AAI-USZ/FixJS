function() {
                self._createDraftComment();

                gCommentDlg
                    .setDraftComment(self.draftComment)
                    .setCommentsList(self.comments, "comment")
                    .css({
                        left: $(document).scrollLeft() +
                              ($(window).width() - gCommentDlg.width()) / 2,
                        top:  self.endRow.offset().top +
                              self.endRow.height()
                    })
                    .open(self.el);
            }