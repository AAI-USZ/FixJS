function result() {
        clearInterval(window.checkResult);
        $(document.body).removeClass('running');
        $('.passing').removeClass('passing');
        $('.runButton').removeAttr('disabled');
        if ($('.test.failed').size()) {
            $('#header').addClass('failed');
        } else {
            $('#header').addClass('passed');
        }
        var areFailedTests = $('.test.failed').size();
        $.ajax({
            type:'GET',
            url:endTestRunnerLink,
            data:{result:areFailedTests ? 'failed' : 'passed'}
        });
        if (areFailedTests) {
            var skip = $("#header").outerHeight();
            skip += $("#results").outerHeight();
        }
    }