function () {

                $("#headers-keyvaleditor .keyvalueeditor-key").autocomplete({

                    source:chromeHeaders,

                    delay:50

                });

                var hs = $('#headers-keyvaleditor').keyvalueeditor('getValues');

                var newHeaders = [];

                for (var i = 0; i < hs.length; i++) {

                    var header = {

                        key:hs[i].key,

                        value:hs[i].value,

                        name:hs[i].key

                    };



                    newHeaders.push(header);

                }



                postman.currentRequest.headers = newHeaders;

                $('#headers-keyvaleditor-actions-open .headers-count').html(newHeaders.length);

            }