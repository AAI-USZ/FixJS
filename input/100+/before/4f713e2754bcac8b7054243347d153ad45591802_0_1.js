function(survey, $container) {
        var self = this,
            $survey = $(survey),
            $summaryCount,
            $commentBox,
            maxCount;

        $container.after($survey);

        // If we are in the sidebar, remove the vote form container.
        if ($container.closest('#side').length) {
            $container.remove();
        }

        $commentBox = $survey.find('textarea')
        $summaryCount = $survey.find('#remaining-characters');
        maxCount = parseInt($summaryCount.text());

        $commentBox.bind("change", function() {
            var currentCount = $commentBox.val().length;
            if (maxCount - currentCount >= 0) {
                $summaryCount.text(maxCount - currentCount);
            } else {
                $summaryCount.text(0);
                $commentBox.val($commentBox.val().substr(0, maxCount));
            }
        });

        new k.AjaxVote($survey.find('form'), {
            replaceFormWithMessage: true
        });
    }