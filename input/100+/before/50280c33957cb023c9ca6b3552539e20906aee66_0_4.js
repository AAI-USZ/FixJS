function () {

        var editorId = "#url-keyvaleditor";



        var params = {

            placeHolderKey:"URL Parameter Key",

            placeHolderValue:"Value",

            deleteButton:'<img class="deleteButton" src="img/delete.png">',

            onDeleteRow:function () {

                var params = $(editorId).keyvalueeditor('getValues');

                var newParams = [];

                for (var i = 0; i < params.length; i++) {

                    var param = {

                        key:params[i].key,

                        value:params[i].value

                    };



                    newParams.push(param);

                }



                postman.currentRequest.setUrlParamString(newParams);

            },



            onBlurElement:function () {

                var params = $(editorId).keyvalueeditor('getValues');

                var newParams = [];

                for (var i = 0; i < params.length; i++) {

                    var param = {

                        key:params[i].key,

                        value:params[i].value

                    };



                    newParams.push(param);

                }



                postman.currentRequest.setUrlParamString(newParams);

            }

        };



        $(editorId).keyvalueeditor('init', params);



        $('#url-keyvaleditor-actions-close').on("click", function () {

            postman.currentRequest.closeUrlEditor();

        });



        $('#url-keyvaleditor-actions-open').on("click", function () {

            var newRows = getUrlVars($('#url').val(), false);

            $(editorId).keyvalueeditor('reset', newRows);

            postman.currentRequest.openUrlEditor();

        });

    }