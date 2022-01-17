function () {

        $("#url").autocomplete({

            source:postman.urlCache.urls,

            delay:50

        });

    }