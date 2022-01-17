function (text, isError) {

        div = '<div class="alert alert-' + (isError ? 'error' : 'success') + '">' + text + '</div>';



        popupIsVisible = $(mynotes.constants.PopupView + ':visible').length > 0;



        $altMsgDiv = $(mynotes.constants.PopupAlertMessage);

        if (!popupIsVisible || $altMsgDiv.length == 0)

            $altMsgDiv = $(mynotes.constants.AlertMessage);



        $altMsgDiv.html(div).fadeIn('slow', function () {

            console.log('i came');

            if (!isError) {

                setTimeout(function () {

                    $(this).fadeOut('slow')

                    console.log('i went');

                }, 10000);

            }

        });

    }