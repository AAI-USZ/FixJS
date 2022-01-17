function () {

            var editorId = "#urlencoded-keyvaleditor";



            var params = {

                placeHolderKey:"Key",

                placeHolderValue:"Value",

                valueTypes:["text"],

                deleteButton:'<img class="deleteButton" src="img/delete.png">',

                onDeleteRow:function () {

                },



                onBlurElement:function () {

                }

            };



            $(editorId).keyvalueeditor('init', params);

        }