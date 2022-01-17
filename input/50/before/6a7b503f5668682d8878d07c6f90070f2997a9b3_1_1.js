function(rsp) {
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