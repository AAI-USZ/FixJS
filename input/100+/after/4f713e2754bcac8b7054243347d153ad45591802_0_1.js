function(survey, $container) {
        var self = this,
            $survey = $(survey),
            $commentCount,
            $commentBox,
            maxCount;

        $container.after($survey);

        // If we are in the sidebar, remove the vote form container.
        if ($container.closest('#side').length) {
            $container.remove();
        }

        $commentBox = $survey.find('textarea')
        $commentCount = $survey.find('#remaining-characters');
        maxCount = parseInt($commentCount.text());

        $commentBox.bind("input", function() {
            var currentCount = $commentBox.val().length;
            if (maxCount - currentCount >= 0) {
                $commentCount.text(maxCount - currentCount);
            } else {
                $commentCount.text(0);
                $commentBox.val($commentBox.val().substr(0, maxCount));
            }
        });

        new k.AjaxVote($survey.find('form'), {
            replaceFormWithMessage: true
        });
    }