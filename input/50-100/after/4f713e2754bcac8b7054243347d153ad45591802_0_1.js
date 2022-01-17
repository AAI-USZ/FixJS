function() {
            var currentCount = $commentBox.val().length;
            if (maxCount - currentCount >= 0) {
                $commentCount.text(maxCount - currentCount);
            } else {
                $commentCount.text(0);
                $commentBox.val($commentBox.val().substr(0, maxCount));
            }
        }