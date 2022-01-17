function getComment(review_id, comment_id, comment_type) {
        if (comments[comment_id]) {
            return comments[comment_id];
        }

        var comment = null;

        if (comment_type === "diff_comments") {
            comment = gReviewRequest
                .createReview(review_id)
                .createDiffComment(comment_id);
        } else if (comment_type === "screenshot_comments") {
            comment = gReviewRequest
                .createReview(review_id)
                .createScreenshotComment(comment_id);
        } else if (comment_type === "file_attachment_comments") {
            comment = gReviewRequest
                .createReview(review_id)
                .createFileAttachmentComment(comment_id);
        } else {
            console.log("getComment received unexpected context type '%s'",
                        comment_type);
        }

        comments[comment_id] = comment;
        return comment;
    }