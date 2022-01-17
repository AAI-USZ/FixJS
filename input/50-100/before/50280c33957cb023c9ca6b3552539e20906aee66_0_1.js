function () {

        var request = {

            url:$('#url').val(),

            data:postman.currentRequest.body.getData(),

            headers:postman.currentRequest.getPackedHeaders(),

            dataMode:postman.currentRequest.dataMode,

            method:postman.currentRequest.method

        };



        return JSON.stringify(request);

    }