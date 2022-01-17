function(thingData) {
        var url;
        var postParams;

        if (thingData.thingId) {
            url = '/flattrclick';
            postParams = {
                thing_id: thingData.thingId
            };
        } else {
            url = '/flattrautosubmit';
            postParams = {
                url: thingData.sourceUrl
            };
        }

        $.post(url, postParams, function(data) {
            if (data === null) {
                console.log("Error: response from Flattr was null");
            } else if (data.hasOwnProperty('error_description')) {
                console.log("Flattr error", data.error_description);
            } else {
                EventSystem.callEventListeners('flattr_click_made', data);
            }
        });
    }