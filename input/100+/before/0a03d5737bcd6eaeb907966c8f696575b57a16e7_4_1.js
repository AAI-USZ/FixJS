function (operation, buildUrl, options, successEvent, events, csid, data) {
        var opts = {
            url: buildUrl(operation, csid),
            type: types[operation],
            dataType: options.dataType,
            contentType: "application/json; charset=utf-8",
            success: function (responseData, textStatus) {
                if (responseData && responseData.isError) {
                    events.onError.fire(operation, "Application error", responseData);
                }
                else {
                    successEvent.fire(responseData || data);
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                events.onError.fire(operation, textStatus);
            }
        };
        if (data) {
            opts.data = JSON.stringify(data);
        }
        return opts;
    }