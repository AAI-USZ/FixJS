function () {

        var params = {

            placeHolderKey:"Header",

            placeHolderValue:"Value",

            deleteButton:'<img class="deleteButton" src="img/delete.png">',

            onInit:function () {

            },



            onAddedParam:function () {

                $("#headers-keyvaleditor .keyvalueeditor-key").autocomplete({

                    source:chromeHeaders,

                    delay:50

                });

            },



            onDeleteRow:function () {

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

            },



            onFocusElement:function () {

                $("#headers-keyvaleditor input").autocomplete({

                    source:chromeHeaders,

                    delay:50

                });

            },



            onBlurElement:function () {

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

            },



            onReset:function () {

                var hs = $('#headers-keyvaleditor').keyvalueeditor('getValues');

                $('#headers-keyvaleditor-actions-open .headers-count').html(hs.length);

            }

        };



        $('#headers-keyvaleditor').keyvalueeditor('init', params);



        $('#headers-keyvaleditor-actions-close').on("click", function () {

            postman.currentRequest.closeHeaderEditor();

        });



        $('#headers-keyvaleditor-actions-open').on("click", function () {

            postman.currentRequest.openHeaderEditor();

        });

    }