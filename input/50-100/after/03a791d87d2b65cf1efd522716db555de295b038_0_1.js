function run() {
        updateSelected();
        $(".runButton").attr('disabled', 'disabled');
        $(document.body).addClass('running');
        $('.test, #header').removeClass('passed').removeClass('failed');
        $.ajax({
            type:'GET',
            url:initTestRunnerLink,
            success:function () {
                runNextTest();
            },
            error:function (request) {
                testError(request.responseText);
            }
        });
    }