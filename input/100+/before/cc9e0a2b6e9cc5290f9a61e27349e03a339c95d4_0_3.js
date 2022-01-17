function (mode) {

            postman.currentRequest.dataMode = mode;

            postman.currentRequest.body.mode = mode;

            $('#dataModeSelector a').removeClass("active");

            $('#dataModeSelector a[data-mode="' + mode + '"]').addClass("active");



            if (mode === "params") {

                postman.currentRequest.body.openFormDataEditor();

                postman.currentRequest.body.closeUrlEncodedEditor();

                $('#bodyDataContainer').css("display", "none");

            }

            else if (mode === "raw") {

                postman.currentRequest.body.closeUrlEncodedEditor();

                postman.currentRequest.body.closeFormDataEditor();

                $('#bodyDataContainer').css("display", "block");

            }

            else if (mode === "urlencoded") {

                postman.currentRequest.body.closeFormDataEditor();

                postman.currentRequest.body.openUrlEncodedEditor();

                $('#bodyDataContainer').css("display", "none");

            }

        }