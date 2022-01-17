function() {
            var currentCount = $commentBox.val().length;
            if (maxCount - currentCount >= 0) {
                $summaryCount.text(maxCount - currentCount);
            } else {
                $summaryCount.text(0);
                $commentBox.val($commentBox.val().substr(0, maxCount));
            }
        }