function (data) {
        console.log('>>> facebookSendGift');
        console.log(data);
        var dataJson = JSON.stringify(data);
        dataObject = JSON.parse(dataJson);

        var requestData = {
            app_id:FACEBOOK_APP_ID,
            method:'apprequests',
            message:dataObject.message,
            data:{
                'type':dataObject.type,
                'amount':dataObject.amount
            },
            title:'Send Gift',
            to:dataObject.uid
        };

        FB.ui(requestData,

            function (response) {
                console.log("[RESPONSE Callback]");
                var data;
                if (response) {
                    data = parseFloat(response.request);
                } else {
                    data = parseFloat(0);
                }
                console.log(response);

                window.swfobject.getObjectById('Testing').facebookSendGift(response);
            }
        );
    }