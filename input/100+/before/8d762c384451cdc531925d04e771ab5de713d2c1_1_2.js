function() {
    var callbacks = {};
    var comments = {};

    /*
     * setCommentState - set the state of comment issue
     * @param review_id the id for the review that the comment belongs to
     * @param comment_id the id of the comment with the issue
     * @param comment_type the type of comment, either "comment" or
     *                     "screenshot_comment"
     * @param state the state to set the comment issue to - either
     *              "open", "resolved", or "dropped"
     */
    this.setCommentState = function(review_id, comment_id,
                                    comment_type, state) {
        var comment = getComment(review_id, comment_id, comment_type);
        requestState(comment, state);
    };

    /*
     * registerCallback - allows clients to register callbacks to be
     * notified when a particular comment state is updated.
     * @param comment_id the id of the comment to be notified about
     * @param callback a function of the form:
     *                 function(issue_state) {}
     */
    this.registerCallback = function(comment_id, callback) {
        if (!callbacks[comment_id]) {
            callbacks[comment_id] = [];
        }

        callbacks[comment_id].push(callback);
    };

    /*
     * A helper function to either generate the appropriate
     * comment object based on comment_type, or to grab the
     * comment from a cache if it's been generated before.
     */
    function getComment(review_id, comment_id, comment_type) {
        if (comments[comment_id]) {
            return comments[comment_id];
        }

        var comment = null;

        if (comment_type == "comment") {
            comment = gReviewRequest
                .createReview(review_id)
                .createDiffComment(comment_id);
        } else if (comment_type == "screenshot_comment") {
            comment = gReviewRequest
                .createReview(review_id)
                .createScreenshotComment(comment_id);
        } else if (comment_type == "file_attachment_comment") {
            comment = gReviewRequest
                .createReview(review_id)
                .createFileAttachmentComment(comment_id);
        }

        comments[comment_id] = comment;
        return comment;
    }

    // Helper function to set the state of a comment
    function requestState(comment, state) {
        comment.ready(function() {
            comment.issue_status = state;
            comment.save({
                success: function(rsp) {
                    notifyCallbacks(comment.id, comment.issue_status);

                    /*
                     * We don't want the current user to receive the
                     * notification that the review request has been
                     * updated, since they themselves updated the
                     * issue status.
                     */
                    if (rsp.last_activity_time) {
                        registerForUpdates(rsp.last_activity_time);
                    }
                }
            });
        });
    }

    /*
     * Helper function that notifies all callbacks registered for
     * a particular comment
     */
    function notifyCallbacks(comment_id, issue_status) {
        for (var i = 0; i < callbacks[comment_id].length; i++) {
            callbacks[comment_id][i](issue_status);
        }
    }
}